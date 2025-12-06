import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getDB } from "../../../../utils/api-routes";

export async function POST(request: NextRequest) {
	try {
		const db = await getDB();
		const body = await request.json();

		const {
			userId,
			password,
			surname,
			name,
			birthdayDate,
			region,
			location,
			gender,
			card,
			hasCard,
		} = body;

		if (!userId || !password) {
			return NextResponse.json(
				{ error: "Требуется userId и password" },
				{ status: 400 }
			);
		}

		let formattedBirthdayDate: Date | null = null;
		if (birthdayDate) {
			const [day, month, year] = birthdayDate.split(".");
			formattedBirthdayDate = new Date(`${year}-${month}-${day}`);
			if (isNaN(formattedBirthdayDate.getTime())) {
				formattedBirthdayDate = null;
			}
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const result = await db.collection("user").updateOne(
			{ _id: ObjectId.createFromHexString(userId) },
			{
				$set: {
					password: hashedPassword,
					surname: surname || "",
					name: name || "",
					birthdayDate: formattedBirthdayDate || null,
					region: region || "",
					location: location || "",
					gender: gender || "male",
					card: card || "",
					hasCard: hasCard || false,
					updatedAt: new Date(),
				},
			}
		);

		if (result.matchedCount === 0) {
			return NextResponse.json(
				{ error: "Пользователь не найден", debug: { userId } },
				{ status: 404 }
			);
		}

		return NextResponse.json(
			{
				success: true,
				message: "Пароль и данные пользователя успешно сохранены",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Ошибка установки пароля и данных:", error);
		return NextResponse.json(
			{
				error: "Внутренняя ошибка сервера",
				details: error instanceof Error ? error.message : "Неизвестная ошибка",
			},
			{ status: 500 }
		);
	}
}
