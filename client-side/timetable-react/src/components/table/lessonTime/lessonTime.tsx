import style from './lessontTime.module.css'

type LessonTimeType = {
    number: number,
    startsAt: string,
    endsAt: string
}
export default function lessonTime({ number, startsAt, endsAt }: LessonTimeType) {
    return (
        <div>
            <div className={style.number}>{number}</div>
            <div className={style.startsAt}>{startsAt}</div>
            <div className={style.endsAt}>{endsAt}</div>
        </div>
    )
}
