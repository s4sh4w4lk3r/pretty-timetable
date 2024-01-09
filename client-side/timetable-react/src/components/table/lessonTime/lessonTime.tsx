import style from './LessonTime.module.css'

type LessonTimeType = {
    number: number,
    startsAt: string,
    endsAt: string
}
export default function lessonTime({ number, startsAt, endsAt }: LessonTimeType) {
    return (
        <div className={style.lessonTime}>
            <p className={style.number}>{number} пара</p>
            <div className={style.time}>
                <p className={style.startsAt}>{startsAt}</p>
                <p className={style.endsAt}>{endsAt}</p>
            </div>
        </div>
    )
}
