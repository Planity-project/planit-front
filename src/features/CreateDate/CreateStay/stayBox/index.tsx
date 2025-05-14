import { format, addDays, differenceInCalendarDays } from "date-fns";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ko } from "date-fns/locale";
import { Placecard } from "./styled";
import { DeleteOutlined } from "@ant-design/icons";
import { CategoryBadge } from "../styled";
//드래그앤 드롭 가능한 박스
export const SortableDayBox = ({ dayData, index, onDelete }: any) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: dayData.date });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Placecard>
      <div
        className="create-dayBox"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <div className="day-label">{index + 1}</div>
        <div className="day-content">
          <div className="day-title">
            <div>
              {format(new Date(dayData.date), "MM.dd(eee)", { locale: ko })} -
              {format(addDays(new Date(dayData.date), 1), "MM.dd(eee)", {
                locale: ko,
              })}
            </div>
            <button
              className="day-delBtn"
              onClick={() => onDelete(index)}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <DeleteOutlined />
            </button>
          </div>
          {dayData.place ? (
            <div className="create-placecard">
              <img
                src={dayData.place.imageSrc || "/defaultImage.png"}
                alt={dayData.place.title || "default"}
                className="create-image"
              />
              <div>
                <div className="create-title">{dayData.place.title}</div>
                <div className="create-info">{dayData.place.address}</div>
                <div className="create-info"> {dayData.place.tel}</div>
              </div>
            </div>
          ) : (
            <p className="day-empty">숙소를 추가해주세요.</p>
          )}
        </div>
      </div>
    </Placecard>
  );
};

interface Place {
  title: string;
  imageSrc?: string;
  category: string;
  tel: string;
  address: string;
}

interface Props {
  place: Place;
  onClick: () => void;
}

export const UnassignedPlaceCard = ({ place, onClick }: Props) => {
  return (
    <div className="create-placecard" onClick={onClick}>
      <img
        src={place.imageSrc || "/defaultImage.png"}
        alt={place.title}
        className="create-image"
      />
      <div>
        <div className="create-title">{place.title}</div>
        <div>
          <CategoryBadge category={place.category}>
            {place.category}
          </CategoryBadge>
          <span>{place.address}</span>
        </div>
        <div className="create-info">{place.tel}</div>
      </div>
    </div>
  );
};
