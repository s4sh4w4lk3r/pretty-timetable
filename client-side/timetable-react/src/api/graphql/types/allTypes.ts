export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: any
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: any
}

export type Query = {
  __typename?: "Query"
  teachers: Array<Teacher>
  cabinets: Array<Cabinet>
  lessonTimes: Array<LessonTime>
  subjects: Array<Subject>
  groups: Array<Group>
  actualCards: Array<ActualCard>
  actualTimetables: Array<ActualTimetable>
  stableCards: Array<StableCard>
  stableTimetables: Array<StableTimetable>
}

export type QueryTeachersArgs = {
  where?: Maybe<TeacherFilterInput>
  order?: Maybe<Array<TeacherSortInput>>
}

export type QueryCabinetsArgs = {
  where?: Maybe<CabinetFilterInput>
  order?: Maybe<Array<CabinetSortInput>>
}

export type QueryLessonTimesArgs = {
  where?: Maybe<LessonTimeFilterInput>
  order?: Maybe<Array<LessonTimeSortInput>>
}

export type QuerySubjectsArgs = {
  where?: Maybe<SubjectFilterInput>
  order?: Maybe<Array<SubjectSortInput>>
}

export type QueryGroupsArgs = {
  where?: Maybe<GroupFilterInput>
  order?: Maybe<Array<GroupSortInput>>
}

export type QueryActualCardsArgs = {
  where?: Maybe<ActualCardFilterInput>
  order?: Maybe<Array<ActualCardSortInput>>
}

export type QueryActualTimetablesArgs = {
  where?: Maybe<ActualTimetableFilterInput>
  order?: Maybe<Array<ActualTimetableSortInput>>
}

export type QueryStableCardsArgs = {
  where?: Maybe<StableCardFilterInput>
  order?: Maybe<Array<StableCardSortInput>>
}

export type QueryStableTimetablesArgs = {
  where?: Maybe<StableTimetableFilterInput>
  order?: Maybe<Array<StableTimetableSortInput>>
}

export type ActualTimetable = {
  __typename?: "ActualTimetable"
  group: Group
  id: Scalars["Int"]
  groupId: Scalars["Int"]
  weekNumber: Scalars["Int"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  cards?: Maybe<Array<ActualCard>>
}

export type ActualCard = {
  __typename?: "ActualCard"
  cabinet: Cabinet
  teacher: Teacher
  subject: Subject
  lessonTime: LessonTime
  id: Scalars["Int"]
  teacherId: Scalars["Int"]
  subjectId: Scalars["Int"]
  cabinetId: Scalars["Int"]
  lessonTimeId: Scalars["Int"]
  date: Scalars["Date"]
  isModified: Scalars["Boolean"]
  isCanceled: Scalars["Boolean"]
  isMoved: Scalars["Boolean"]
  subGroup: SubGroup
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  relatedTimetableId: Scalars["Int"]
}

export type StableTimetable = {
  __typename?: "StableTimetable"
  id: Scalars["Int"]
  group?: Maybe<Group>
  groupId: Scalars["Int"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
  cards?: Maybe<Array<StableCard>>
}

export type StableCard = {
  __typename?: "StableCard"
  cabinet: Cabinet
  teacher: Teacher
  subject: Subject
  lessonTime: LessonTime
  id: Scalars["Int"]
  teacherId: Scalars["Int"]
  subjectId: Scalars["Int"]
  cabinetId: Scalars["Int"]
  lessonTimeId: Scalars["Int"]
  isWeekEven: Scalars["Boolean"]
  dayOfWeek: DayOfWeek
  subGroup: SubGroup
  relatedTimetableId: Scalars["Int"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Group = {
  __typename?: "Group"
  id: Scalars["Int"]
  name: Scalars["String"]
  ascId?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Teacher = {
  __typename?: "Teacher"
  id: Scalars["Int"]
  lastname: Scalars["String"]
  firstname: Scalars["String"]
  middlename: Scalars["String"]
  ascId?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Subject = {
  __typename?: "Subject"
  id: Scalars["Int"]
  name: Scalars["String"]
  ascId?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type Cabinet = {
  __typename?: "Cabinet"
  id: Scalars["Int"]
  address: Scalars["String"]
  number: Scalars["String"]
  fullName: Scalars["String"]
  ascId?: Maybe<Scalars["String"]>
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export type LessonTime = {
  __typename?: "LessonTime"
  endsAt: Scalars["String"]
  startsAt: Scalars["String"]
  id: Scalars["Int"]
  number: Scalars["Int"]
  createdAt: Scalars["DateTime"]
  updatedAt: Scalars["DateTime"]
}

export enum SubGroup {
  All = "ALL",
  FirstGroup = "FIRST_GROUP",
  SecondGroup = "SECOND_GROUP",
  Males = "MALES",
  Females = "FEMALES"
}

export enum DayOfWeek {
  Sunday = "SUNDAY",
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY",
  Saturday = "SATURDAY"
}

export type TeacherFilterInput = {
  and?: Maybe<Array<TeacherFilterInput>>
  or?: Maybe<Array<TeacherFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  lastname?: Maybe<StringOperationFilterInput>
  firstname?: Maybe<StringOperationFilterInput>
  middlename?: Maybe<StringOperationFilterInput>
  ascId?: Maybe<StringOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type TeacherSortInput = {
  id?: Maybe<SortEnumType>
  lastname?: Maybe<SortEnumType>
  firstname?: Maybe<SortEnumType>
  middlename?: Maybe<SortEnumType>
  ascId?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type CabinetFilterInput = {
  and?: Maybe<Array<CabinetFilterInput>>
  or?: Maybe<Array<CabinetFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  address?: Maybe<StringOperationFilterInput>
  number?: Maybe<StringOperationFilterInput>
  fullName?: Maybe<StringOperationFilterInput>
  ascId?: Maybe<StringOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type CabinetSortInput = {
  id?: Maybe<SortEnumType>
  address?: Maybe<SortEnumType>
  number?: Maybe<SortEnumType>
  fullName?: Maybe<SortEnumType>
  ascId?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type LessonTimeFilterInput = {
  and?: Maybe<Array<LessonTimeFilterInput>>
  or?: Maybe<Array<LessonTimeFilterInput>>
  endsAt: Scalars["String"]
  startsAt: Scalars["String"]
  id?: Maybe<IntOperationFilterInput>
  number?: Maybe<IntOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type LessonTimeSortInput = {
  endsAt: Scalars["String"]
  startsAt: Scalars["String"]
  id?: Maybe<SortEnumType>
  number?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type SubjectFilterInput = {
  and?: Maybe<Array<SubjectFilterInput>>
  or?: Maybe<Array<SubjectFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  name?: Maybe<StringOperationFilterInput>
  ascId?: Maybe<StringOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type SubjectSortInput = {
  id?: Maybe<SortEnumType>
  name?: Maybe<SortEnumType>
  ascId?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type GroupFilterInput = {
  and?: Maybe<Array<GroupFilterInput>>
  or?: Maybe<Array<GroupFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  name?: Maybe<StringOperationFilterInput>
  ascId?: Maybe<StringOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type GroupSortInput = {
  id?: Maybe<SortEnumType>
  name?: Maybe<SortEnumType>
  ascId?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type ActualCardFilterInput = {
  and?: Maybe<Array<ActualCardFilterInput>>
  or?: Maybe<Array<ActualCardFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  teacher?: Maybe<TeacherFilterInput>
  subject?: Maybe<SubjectFilterInput>
  cabinet?: Maybe<CabinetFilterInput>
  lessonTime?: Maybe<LessonTimeFilterInput>
  teacherId?: Maybe<IntOperationFilterInput>
  subjectId?: Maybe<IntOperationFilterInput>
  cabinetId?: Maybe<IntOperationFilterInput>
  lessonTimeId?: Maybe<IntOperationFilterInput>
  date?: Maybe<DateOperationFilterInput>
  isModified?: Maybe<BooleanOperationFilterInput>
  isCanceled?: Maybe<BooleanOperationFilterInput>
  isMoved?: Maybe<BooleanOperationFilterInput>
  subGroup?: Maybe<SubGroupOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
  relatedTimetableId?: Maybe<IntOperationFilterInput>
  relatedTimetable?: Maybe<ActualTimetableFilterInput>
}

export type ActualCardSortInput = {
  id?: Maybe<SortEnumType>
  teacher?: Maybe<TeacherSortInput>
  subject?: Maybe<SubjectSortInput>
  cabinet?: Maybe<CabinetSortInput>
  lessonTime?: Maybe<LessonTimeSortInput>
  teacherId?: Maybe<SortEnumType>
  subjectId?: Maybe<SortEnumType>
  cabinetId?: Maybe<SortEnumType>
  lessonTimeId?: Maybe<SortEnumType>
  date?: Maybe<SortEnumType>
  isModified?: Maybe<SortEnumType>
  isCanceled?: Maybe<SortEnumType>
  isMoved?: Maybe<SortEnumType>
  subGroup?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
  relatedTimetableId?: Maybe<SortEnumType>
  relatedTimetable?: Maybe<ActualTimetableSortInput>
}

export type ActualTimetableFilterInput = {
  and?: Maybe<Array<ActualTimetableFilterInput>>
  or?: Maybe<Array<ActualTimetableFilterInput>>
  cards?: Maybe<ActualCardFilterInput>
  id?: Maybe<IntOperationFilterInput>
  group?: Maybe<GroupFilterInput>
  groupId?: Maybe<IntOperationFilterInput>
  weekNumber?: Maybe<IntOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type ActualTimetableSortInput = {
  id?: Maybe<SortEnumType>
  group?: Maybe<GroupSortInput>
  groupId?: Maybe<SortEnumType>
  weekNumber?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type StableCardFilterInput = {
  and?: Maybe<Array<StableCardFilterInput>>
  or?: Maybe<Array<StableCardFilterInput>>
  id?: Maybe<IntOperationFilterInput>
  teacher?: Maybe<TeacherFilterInput>
  subject?: Maybe<SubjectFilterInput>
  cabinet?: Maybe<CabinetFilterInput>
  lessonTime?: Maybe<LessonTimeFilterInput>
  teacherId?: Maybe<IntOperationFilterInput>
  subjectId?: Maybe<IntOperationFilterInput>
  cabinetId?: Maybe<IntOperationFilterInput>
  lessonTimeId?: Maybe<IntOperationFilterInput>
  isWeekEven?: Maybe<BooleanOperationFilterInput>
  dayOfWeek?: Maybe<DayOfWeekOperationFilterInput>
  subGroup?: Maybe<SubGroupOperationFilterInput>
  relatedTimetableId?: Maybe<IntOperationFilterInput>
  relatedTimetable?: Maybe<StableTimetableFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type StableCardSortInput = {
  id?: Maybe<SortEnumType>
  teacher?: Maybe<TeacherSortInput>
  subject?: Maybe<SubjectSortInput>
  cabinet?: Maybe<CabinetSortInput>
  lessonTime?: Maybe<LessonTimeSortInput>
  teacherId?: Maybe<SortEnumType>
  subjectId?: Maybe<SortEnumType>
  cabinetId?: Maybe<SortEnumType>
  lessonTimeId?: Maybe<SortEnumType>
  isWeekEven?: Maybe<SortEnumType>
  dayOfWeek?: Maybe<SortEnumType>
  subGroup?: Maybe<SortEnumType>
  relatedTimetableId?: Maybe<SortEnumType>
  relatedTimetable?: Maybe<StableTimetableSortInput>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export type StableTimetableFilterInput = {
  and?: Maybe<Array<StableTimetableFilterInput>>
  or?: Maybe<Array<StableTimetableFilterInput>>
  cards?: Maybe<StableCardFilterInput>
  id?: Maybe<IntOperationFilterInput>
  group?: Maybe<GroupFilterInput>
  groupId?: Maybe<IntOperationFilterInput>
  createdAt?: Maybe<DateTimeOperationFilterInput>
  updatedAt?: Maybe<DateTimeOperationFilterInput>
}

export type StableTimetableSortInput = {
  id?: Maybe<SortEnumType>
  group?: Maybe<GroupSortInput>
  groupId?: Maybe<SortEnumType>
  createdAt?: Maybe<SortEnumType>
  updatedAt?: Maybe<SortEnumType>
}

export enum ApplyPolicy {
  BeforeResolver = "BEFORE_RESOLVER",
  AfterResolver = "AFTER_RESOLVER",
  Validation = "VALIDATION"
}

export type IntOperationFilterInput = {
  eq?: Maybe<Scalars["Int"]>
  neq?: Maybe<Scalars["Int"]>
  in?: Maybe<Array<Maybe<Scalars["Int"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Int"]>>>
  gt?: Maybe<Scalars["Int"]>
  ngt?: Maybe<Scalars["Int"]>
  gte?: Maybe<Scalars["Int"]>
  ngte?: Maybe<Scalars["Int"]>
  lt?: Maybe<Scalars["Int"]>
  nlt?: Maybe<Scalars["Int"]>
  lte?: Maybe<Scalars["Int"]>
  nlte?: Maybe<Scalars["Int"]>
}

export type StringOperationFilterInput = {
  and?: Maybe<Array<StringOperationFilterInput>>
  or?: Maybe<Array<StringOperationFilterInput>>
  eq?: Maybe<Scalars["String"]>
  neq?: Maybe<Scalars["String"]>
  contains?: Maybe<Scalars["String"]>
  ncontains?: Maybe<Scalars["String"]>
  in?: Maybe<Array<Maybe<Scalars["String"]>>>
  nin?: Maybe<Array<Maybe<Scalars["String"]>>>
  startsWith?: Maybe<Scalars["String"]>
  nstartsWith?: Maybe<Scalars["String"]>
  endsWith?: Maybe<Scalars["String"]>
  nendsWith?: Maybe<Scalars["String"]>
}

export type DateTimeOperationFilterInput = {
  eq?: Maybe<Scalars["DateTime"]>
  neq?: Maybe<Scalars["DateTime"]>
  in?: Maybe<Array<Maybe<Scalars["DateTime"]>>>
  nin?: Maybe<Array<Maybe<Scalars["DateTime"]>>>
  gt?: Maybe<Scalars["DateTime"]>
  ngt?: Maybe<Scalars["DateTime"]>
  gte?: Maybe<Scalars["DateTime"]>
  ngte?: Maybe<Scalars["DateTime"]>
  lt?: Maybe<Scalars["DateTime"]>
  nlt?: Maybe<Scalars["DateTime"]>
  lte?: Maybe<Scalars["DateTime"]>
  nlte?: Maybe<Scalars["DateTime"]>
}

export enum SortEnumType {
  Asc = "ASC",
  Desc = "DESC"
}

export type DateOperationFilterInput = {
  eq?: Maybe<Scalars["Date"]>
  neq?: Maybe<Scalars["Date"]>
  in?: Maybe<Array<Maybe<Scalars["Date"]>>>
  nin?: Maybe<Array<Maybe<Scalars["Date"]>>>
  gt?: Maybe<Scalars["Date"]>
  ngt?: Maybe<Scalars["Date"]>
  gte?: Maybe<Scalars["Date"]>
  ngte?: Maybe<Scalars["Date"]>
  lt?: Maybe<Scalars["Date"]>
  nlt?: Maybe<Scalars["Date"]>
  lte?: Maybe<Scalars["Date"]>
  nlte?: Maybe<Scalars["Date"]>
}

export type BooleanOperationFilterInput = {
  eq?: Maybe<Scalars["Boolean"]>
  neq?: Maybe<Scalars["Boolean"]>
}

export type SubGroupOperationFilterInput = {
  eq?: Maybe<SubGroup>
  neq?: Maybe<SubGroup>
  in?: Maybe<Array<SubGroup>>
  nin?: Maybe<Array<SubGroup>>
}

export type DayOfWeekOperationFilterInput = {
  eq?: Maybe<DayOfWeek>
  neq?: Maybe<DayOfWeek>
  in?: Maybe<Array<DayOfWeek>>
  nin?: Maybe<Array<DayOfWeek>>
}
