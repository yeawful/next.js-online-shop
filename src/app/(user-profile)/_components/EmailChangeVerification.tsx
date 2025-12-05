import {
	Html,
	Head,
	Body,
	Container,
	Section,
	Text,
	Button,
	Hr,
} from "@react-email/components";
import styles from "./EmailChangeVerification.module.css";

interface EmailChangeVerificationProps {
	username: string;
	currentEmail: string;
	newEmail: string;
	verificationUrl: string;
}

const EmailChangeVerification = (props: EmailChangeVerificationProps) => {
	const { username, currentEmail, newEmail, verificationUrl } = props;

	return (
		<Html lang="ru" dir="ltr">
			<Head />
			<Body className={styles.body}>
				<Container className={styles.container}>
					<Section>
						<Text className={styles.title}>Подтверждение смены email</Text>

						<Text className={styles.text}>
							Здравствуйте, {username}! Мы получили запрос на изменение email
							адреса для вашего аккаунта.
						</Text>

						<Section className={styles.emailSection}>
							<Text className={styles.emailText}>
								<strong>Текущий email:</strong> {currentEmail}
							</Text>
							<Text className={styles.emailText}>
								<strong>Новый email:</strong> {newEmail}
							</Text>
						</Section>

						<Text className={styles.text}>
							Для подтверждения смены email нажмите на кнопку ниже:
						</Text>

						<Section className={styles.buttonSection}>
							<Button href={verificationUrl} className={styles.button}>
								Подтвердить смену email
							</Button>
						</Section>

						<Text className={styles.smallText}>
							Если кнопка не работает, скопируйте и вставьте эту ссылку в
							адресную строку браузера:
							<br />
							<span className={styles.breakAll}>{verificationUrl}</span>
						</Text>

						<Text className={styles.smallText}>
							Ссылка для подтверждения будет активна в течение 24 часов. Если Вы
							не запрашивали изменение email, пожалуйста, проигнорируйте это
							письмо или свяжитесь со службой поддержки.
						</Text>

						<Hr className={styles.divider} />

						<Text className={styles.footerText}>
							С уважением,
							<br />
							Команда &quot;Северяночки&quot;
						</Text>
					</Section>

					<Section className={styles.companySection}>
						<Text className={styles.companyInfo}>
							Северяночка
							<br />
							Россия, Архангельск, ул. Ленина, д.1
							<br />
							ИНН 0291234567890
						</Text>

						<Text className={styles.copyright}>
							© {new Date().getFullYear()} Северяночка. Все права защищены.
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default EmailChangeVerification;
