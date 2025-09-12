import Link from "next/link";
import styles from "./chat.module.css";

interface RoomCardProps {
    name: string;
    roomID: number;
}

export default function RoomCard({ name, roomID }: RoomCardProps) {
  return (
    <Link href={`/chat/${roomID}`} className={styles.roomCard}>
      <div className={styles.roomCardContent}>
        {name}
      </div>
    </Link>
  );
}
