// Тут схема графкл

export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    DateTime: any;
    Date: any;
};

// export type Group = {
//     id: Scalars["Int"];
//     name: Scalars["String"];
//     ascId?: Scalars["String"];
//     modifiedAt: Scalars["DateTime"];
// };

// export type Teacher = {
//     id: Scalars["Int"];
//     lastname: Scalars["String"];
//     firstname: Scalars["String"];
//     middlename: Scalars["String"];
//     ascId?: Scalars["String"];
//     modifiedAt: Scalars["DateTime"];
// };

// export type Subject = {
//     id: Scalars["Int"];
//     name: Scalars["String"];
//     ascId?: Scalars["String"];
//     modifiedAt: Scalars["DateTime"];
// };

export type Room = {
    id: Scalars["Int"];
    address: Scalars["String"];
    number: Scalars["String"];
    fullName: Scalars["String"];
    ascId?: Scalars["String"];
    modifiedAt: Scalars["DateTime"];
};

// export type LessonTime = {
//     endsAt: Scalars["String"];
//     startsAt: Scalars["String"];
//     id: Scalars["Int"];
//     number: Scalars["Int"];
//     modifiedAt: Scalars["DateTime"];
// };

// export type ActualTimetable = {
//     group: Group;
//     id: Scalars["Int"];
//     groupId: Scalars["Int"];
//     weekNumber: Scalars["Int"];
//     modifiedAt: Scalars["DateTime"];
//     cards?: Array<ActualCard>;
// };

// export type ActualCard = {
//     cabinet: Room;
//     teacher: Teacher;
//     subject: Subject;
//     lessonTime: LessonTime;
//     id: Scalars["Int"];
//     teacherId: Scalars["Int"];
//     subjectId: Scalars["Int"];
//     roomId: Scalars["Int"];
//     lessonTimeId: Scalars["Int"];
//     date: Scalars["Date"];
//     isModified: Scalars["Boolean"];
//     isCanceled: Scalars["Boolean"];
//     isMoved: Scalars["Boolean"];
//     subGroup: SubGroup;
//     modifiedAt: Scalars["DateTime"];
//     relatedTimetableId: Scalars["Int"];
// };

// export type StableTimetable = {
//     id: Scalars["Int"];
//     group: Group;
//     groupId: Scalars["Int"];
//     modifiedAt: Scalars["DateTime"];
//     cards?: Array<StableCard>;
// };

// export type StableCard = {
//     cabinet: Room;
//     teacher: Teacher;
//     subject: Subject;
//     lessonTime: LessonTime;
//     id: Scalars["Int"];
//     teacherId: Scalars["Int"];
//     subjectId: Scalars["Int"];
//     roomId: Scalars["Int"];
//     lessonTimeId: Scalars["Int"];
//     isWeekEven: Scalars["Boolean"];
//     dayOfWeek: DayOfWeek;
//     subGroup: SubGroup;
//     relatedTimetableId: Scalars["Int"];
//     modifiedAt: Scalars["DateTime"];
// };

// export enum SubGroup {
//     All = "ALL",
//     FirstGroup = "FIRST_GROUP",
//     SecondGroup = "SECOND_GROUP",
//     Males = "MALES",
//     Females = "FEMALES",
// }

// export enum DayOfWeek {
//     Sunday = "SUNDAY",
//     Monday = "MONDAY",
//     Tuesday = "TUESDAY",
//     Wednesday = "WEDNESDAY",
//     Thursday = "THURSDAY",
//     Friday = "FRIDAY",
//     Saturday = "SATURDAY",
// }
