"use client";

import { Loader } from "@/components/loaders/Loader";
import { useEffect } from "react";
import AddTimeSlotForm from "./_components/AddTimeSlotForm";
import MessageAlert from "./_components/MessageAlert";
import { useDeliverySchedule } from "@/hooks/useDeliverySchedule";
import { getThreeDaysDates } from "./utils/getThreeDaysDates";
import { sortTimeSlots } from "./utils/sortTimeSlots";
import ScheduleTable from "./_components/ScheduleTable";
import SaveButton from "./_components/SaveButton";
import styles from "./page.module.css";

export default function DeliveryTimesAdmin() {
	const {
		schedule,
		loading,
		saving,
		message,
		error,
		startTime,
		endTime,
		timeSlots,
		setStartTime,
		setEndTime,
		fetchDeliveryTimes,
		addTimeSlot,
		updateTimeSlotStatus,
		removeTimeSlot,
		saveDeliveryTimes,
	} = useDeliverySchedule();

	const dates = getThreeDaysDates();
	const sortedTimeSlots = sortTimeSlots(timeSlots);

	useEffect(() => {
		fetchDeliveryTimes();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) return <Loader />;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Управление графиком доставки на 3 дня</h1>

			<AddTimeSlotForm
				startTime={startTime}
				endTime={endTime}
				onStartTimeChange={setStartTime}
				onEndTimeChange={setEndTime}
				onAddTimeSlot={addTimeSlot}
			/>

			<div className={styles.tableWrapper}>
				<ScheduleTable
					sortedTimeSlots={sortedTimeSlots}
					dates={dates}
					schedule={schedule}
					onRemoveTimeSlot={removeTimeSlot}
					onUpdateTimeSlotStatus={updateTimeSlotStatus}
				/>
			</div>

			<SaveButton saving={saving} onClick={saveDeliveryTimes} />
			{message && <MessageAlert message={message} />}
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
}
