import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import { useAuthStore } from "@/store/authStore";
import { ChatMessage, OrderChatModalProps } from "@/types/chat";
import { useGetOrderMessagesQuery } from "@/store/redux/api/chatApi";
import { getRoleDisplayName } from "../utils/getRoleDisplayName";
import styles from "./OrderChatModal.module.css";

const OrderChatModal = ({ orderId, isOpen, onClose }: OrderChatModalProps) => {
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const { user } = useAuthStore();

	const { data: messages = [] } = useGetOrderMessagesQuery(orderId, {
		skip: !isOpen || !orderId,
		pollingInterval: isOpen ? 3000 : 0,
	});

	const getMessageRole = (msg: ChatMessage) => {
		return msg.userRole || "courier";
	};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSendMessage = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!message.trim() || isSending) return;

		setIsSending(true);

		try {
			const response = await fetch("/api/admin/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					orderId,
					message: message.trim(),
					userName: user?.name,
					userRole: user?.role,
				}),
			});

			if (!response.ok) {
				throw new Error(`Ошибка ${response.status}`);
			}

			setMessage("");
		} catch (error) {
			console.error("Ошибка отправки сообщения:", error);
		} finally {
			setIsSending(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<button onClick={onClose} className={styles.closeButton}>
					<Image
						src="/icons-auth/icon-closer.svg"
						alt="Закрыть"
						width={24}
						height={24}
					/>
				</button>
				<h3 className={styles.title}>Комментарии</h3>

				<div className={styles.messagesContainer}>
					{messages.map((msg) => {
						const role = getMessageRole(msg);
						const roleDisplayName = getRoleDisplayName(role);

						return (
							<div key={msg._id} className="flex flex-col">
								<div className={styles.messageHeader}>
									<div>{msg.userName}</div>
									<div>{roleDisplayName}</div>
									<div>
										{new Date(msg.timestamp).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}{" "}
										{new Date(msg.timestamp).toLocaleDateString("ru-RU", {
											day: "2-digit",
											month: "2-digit",
											year: "numeric",
										})}
									</div>
								</div>
								<div className={styles.messageContent}>{msg.message}</div>
							</div>
						);
					})}
					<div ref={messagesEndRef} />
				</div>

				<form onSubmit={handleSendMessage} className={styles.form}>
					<div className={styles.formContainer}>
						<textarea
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							placeholder="Введите сообщение..."
							className={styles.textarea}
							disabled={isSending}
							rows={4}
						/>
						<button
							type="submit"
							disabled={!message.trim() || isSending}
							className={styles.submitButton}
						>
							{isSending ? "..." : "Отправить"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default OrderChatModal;
