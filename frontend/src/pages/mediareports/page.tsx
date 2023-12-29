import { Search } from "lucide-react";
import { useState } from "react";
import MediaItem from "../../components/ui/MediaItem";

interface IMediaItemProps {
  id: number;
  time: number;
  NumberOrder: string;
  description: string;
  isComplete: boolean;
}

const data: IMediaItemProps[] = [
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: false,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
  {
    id: 1,
    time: Date.now(),
    description:
      "АПП Адлер - Здание контрольных служб пассажирского автобусного комплекса Приоритет: Ежедневные Вид работы: ТО - Система водоснабжения ФИО: Техник (ТО) 2 ИП Задыханова В.В. Ракурсы/Фотоотчёты: 0/0 Всего по ракурсу: 0 (0%)",
    NumberOrder: "23/11-784-638361406240008383",
    isComplete: true,
  },
];

export default function MediaReportspage() {
  const [search, setSearch] = useState("");

  return (
    <div className="grid grid-rows-10 p-7 gap-4 w-full    ">
      <div className="font-[700] font-pop text-[28px] text-[#3F434A]">
        Проверка медиаотчётов
      </div>
      <div className="row-2">
        <div className="bg-white rounded-2xl w-full h-[37px]   flex items-center justify-start">
          <div className="ml-3 mr-3">
            <Search color="#8A9099" size={20} />
          </div>
          <div className="flex-auto ">
            <input
              className="w-full focus:outline-none "
              value={search}
              placeholder="Искать..."
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-wrap gap-4 items-center justify-start  w-full">
        {data.map((item, key) => (
          <div className="" key={key}>
            <MediaItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
