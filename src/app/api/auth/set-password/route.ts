import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";
import { getDB } from "../../../../utils/api-routes";

export async function POST(request: NextRequest) {
	try {
		const {
			userId,
			password,

			surname,
			name,
			email,
			birthdayDate,
			region,
			location,
			gender,
			card,
			hasCard,
		} = await request.json();

		if (!userId || !password) {
			return Response.json(
				{ error: "Требуется userId и password" },
				{ status: 400 }
			);
		}

		const db = await getDB();

		const updateData: Record<string, unknown> = {
			password: await bcrypt.hash(password, 10),
			updatedAt: new Date(),
		};

		if (surname) updateData.surname = surname;
		if (name) updateData.name = name;
		if (email) updateData.email = email;
		if (birthdayDate) updateData.birthdayDate = birthdayDate;
		if (region) updateData.region = region;
		if (location) updateData.location = location;
		if (gender) updateData.gender = gender;
		if (hasCard) updateData.card = card;

		const result = await db
			.collection("user")
			.updateOne(
				{ _id: ObjectId.createFromHexString(userId) },
				{ $set: updateData }
			);

		if (result.matchedCount === 0) {
			return Response.json(
				{ error: "Пользователь не найден", debug: { userId } },
				{ status: 404 }
			);
		}

		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		console.error("Ошибка:", error);
		return Response.json(
			{ error: "Внутренняя ошибка сервера" },
			{ status: 500 }
		);
	}
}
