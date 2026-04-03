import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [isSending, setIsSending] = useState(false);

    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();

    // 🔥 Image select
    const handleImageChange = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            toast.error("Only image files allowed");
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be under 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    // 🔥 Remove image
    const removeImage = () => {
        setImagePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // 🔥 Send message
    const handleSendMessage = async (e) => {
        e.preventDefault();

        if ((!text.trim() && !imagePreview) || isSending) return;

        try {
            setIsSending(true);

            await sendMessage({
                text: text.trim(),
                image: imagePreview,
            });

            setText("");
            setImagePreview(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (err) {
            toast.error("Send failed");
            console.error(err);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="p-4 border-t border-base-300 bg-base-100">

            {/* Preview */}
            {imagePreview && (
                <div className="mb-3">
                    <div className="relative w-fit">
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="w-20 h-20 rounded-lg object-cover border"
                        />
                        <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-base-300 rounded-full p-1"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2 items-center">

                <input
                    type="text"
                    placeholder="Type message..."
                    className="flex-1 input input-bordered rounded-full"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isSending}
                />

                {/* 🔥 Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                />

                {/* 🔥 Button trigger */}
                <button
                    type="button"
                    onClick={() => {
                        if (fileInputRef.current) {
                            fileInputRef.current.click();
                        } else {
                            console.log("file input not mounted");
                        }
                    }}
                    className="btn btn-circle"
                >
                    <Image size={18} />
                </button>

                <button
                    type="submit"
                    className="btn btn-circle btn-primary"
                    disabled={(!text.trim() && !imagePreview) || isSending}
                >
                    <Send size={18} />
                </button>

            </form>
        </div>
    );
};

export default MessageInput;