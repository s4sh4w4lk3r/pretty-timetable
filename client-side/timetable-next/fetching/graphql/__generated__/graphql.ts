/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `Date` scalar represents an ISO-8601 compliant date type. */
  Date: { input: any; output: any; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
};

export type ActualCard = {
  __typename?: 'ActualCard';
  cabinet: Room;
  date: Scalars['Date']['output'];
  id: Scalars['Int']['output'];
  isCanceled: Scalars['Boolean']['output'];
  isModified: Scalars['Boolean']['output'];
  isMoved: Scalars['Boolean']['output'];
  lessonTime: LessonTime;
  lessonTimeId: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  relatedTimetableId: Scalars['Int']['output'];
  roomId: Scalars['Int']['output'];
  subGroup: SubGroup;
  subject: Subject;
  subjectId: Scalars['Int']['output'];
  teacher: Teacher;
  teacherId: Scalars['Int']['output'];
};

export type ActualCardFilterInput = {
  and?: InputMaybe<Array<ActualCardFilterInput>>;
  cabinet?: InputMaybe<RoomFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isCanceled?: InputMaybe<BooleanOperationFilterInput>;
  isModified?: InputMaybe<BooleanOperationFilterInput>;
  isMoved?: InputMaybe<BooleanOperationFilterInput>;
  lessonTime?: InputMaybe<LessonTimeFilterInput>;
  lessonTimeId?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ActualCardFilterInput>>;
  relatedTimetable?: InputMaybe<ActualTimetableFilterInput>;
  relatedTimetableId?: InputMaybe<IntOperationFilterInput>;
  roomId?: InputMaybe<IntOperationFilterInput>;
  subGroup?: InputMaybe<SubGroupOperationFilterInput>;
  subject?: InputMaybe<SubjectFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  teacher?: InputMaybe<TeacherFilterInput>;
  teacherId?: InputMaybe<IntOperationFilterInput>;
};

export type ActualCardSortInput = {
  cabinet?: InputMaybe<RoomSortInput>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isCanceled?: InputMaybe<SortEnumType>;
  isModified?: InputMaybe<SortEnumType>;
  isMoved?: InputMaybe<SortEnumType>;
  lessonTime?: InputMaybe<LessonTimeSortInput>;
  lessonTimeId?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  relatedTimetable?: InputMaybe<ActualTimetableSortInput>;
  relatedTimetableId?: InputMaybe<SortEnumType>;
  roomId?: InputMaybe<SortEnumType>;
  subGroup?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SubjectSortInput>;
  subjectId?: InputMaybe<SortEnumType>;
  teacher?: InputMaybe<TeacherSortInput>;
  teacherId?: InputMaybe<SortEnumType>;
};

export type ActualTimetable = {
  __typename?: 'ActualTimetable';
  cards?: Maybe<Array<ActualCard>>;
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  weekNumber: Scalars['Int']['output'];
};

export type ActualTimetableFilterInput = {
  and?: InputMaybe<Array<ActualTimetableFilterInput>>;
  cards?: InputMaybe<ActualCardFilterInput>;
  group?: InputMaybe<GroupFilterInput>;
  groupId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<ActualTimetableFilterInput>>;
  weekNumber?: InputMaybe<IntOperationFilterInput>;
};

export type ActualTimetableSortInput = {
  group?: InputMaybe<GroupSortInput>;
  groupId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  weekNumber?: InputMaybe<SortEnumType>;
};

export enum ApplyPolicy {
  AfterResolver = 'AFTER_RESOLVER',
  BeforeResolver = 'BEFORE_RESOLVER',
  Validation = 'VALIDATION'
}

export type BooleanOperationFilterInput = {
  eq?: InputMaybe<Scalars['Boolean']['input']>;
  neq?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DateOperationFilterInput = {
  eq?: InputMaybe<Scalars['Date']['input']>;
  gt?: InputMaybe<Scalars['Date']['input']>;
  gte?: InputMaybe<Scalars['Date']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  lt?: InputMaybe<Scalars['Date']['input']>;
  lte?: InputMaybe<Scalars['Date']['input']>;
  neq?: InputMaybe<Scalars['Date']['input']>;
  ngt?: InputMaybe<Scalars['Date']['input']>;
  ngte?: InputMaybe<Scalars['Date']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Date']['input']>>>;
  nlt?: InputMaybe<Scalars['Date']['input']>;
  nlte?: InputMaybe<Scalars['Date']['input']>;
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export enum DayOfWeek {
  Friday = 'FRIDAY',
  Monday = 'MONDAY',
  Saturday = 'SATURDAY',
  Sunday = 'SUNDAY',
  Thursday = 'THURSDAY',
  Tuesday = 'TUESDAY',
  Wednesday = 'WEDNESDAY'
}

export type DayOfWeekOperationFilterInput = {
  eq?: InputMaybe<DayOfWeek>;
  in?: InputMaybe<Array<DayOfWeek>>;
  neq?: InputMaybe<DayOfWeek>;
  nin?: InputMaybe<Array<DayOfWeek>>;
};

export type Group = {
  __typename?: 'Group';
  ascId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type GroupFilterInput = {
  and?: InputMaybe<Array<GroupFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GroupFilterInput>>;
};

export type GroupSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type LessonTime = {
  __typename?: 'LessonTime';
  endsAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  number: Scalars['Int']['output'];
  startsAt: Scalars['String']['output'];
};

export type LessonTimeFilterInput = {
  and?: InputMaybe<Array<LessonTimeFilterInput>>;
  endsAt: Scalars['String']['input'];
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  number?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LessonTimeFilterInput>>;
  startsAt: Scalars['String']['input'];
};

export type LessonTimeSortInput = {
  endsAt: Scalars['String']['input'];
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  startsAt: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  actualCards: Array<ActualCard>;
  actualTimetables: Array<ActualTimetable>;
  groups: Array<Group>;
  lessonTimes: Array<LessonTime>;
  rooms: Array<Room>;
  stableCards: Array<StableCard>;
  stableTimetables: Array<StableTimetable>;
  subjects: Array<Subject>;
  teachers: Array<Teacher>;
};


export type QueryActualCardsArgs = {
  order?: InputMaybe<Array<ActualCardSortInput>>;
  where?: InputMaybe<ActualCardFilterInput>;
};


export type QueryActualTimetablesArgs = {
  order?: InputMaybe<Array<ActualTimetableSortInput>>;
  where?: InputMaybe<ActualTimetableFilterInput>;
};


export type QueryGroupsArgs = {
  order?: InputMaybe<Array<GroupSortInput>>;
  where?: InputMaybe<GroupFilterInput>;
};


export type QueryLessonTimesArgs = {
  order?: InputMaybe<Array<LessonTimeSortInput>>;
  where?: InputMaybe<LessonTimeFilterInput>;
};


export type QueryRoomsArgs = {
  order?: InputMaybe<Array<RoomSortInput>>;
  where?: InputMaybe<RoomFilterInput>;
};


export type QueryStableCardsArgs = {
  order?: InputMaybe<Array<StableCardSortInput>>;
  where?: InputMaybe<StableCardFilterInput>;
};


export type QueryStableTimetablesArgs = {
  order?: InputMaybe<Array<StableTimetableSortInput>>;
  where?: InputMaybe<StableTimetableFilterInput>;
};


export type QuerySubjectsArgs = {
  order?: InputMaybe<Array<SubjectSortInput>>;
  where?: InputMaybe<SubjectFilterInput>;
};


export type QueryTeachersArgs = {
  order?: InputMaybe<Array<TeacherSortInput>>;
  where?: InputMaybe<TeacherFilterInput>;
};

export type Room = {
  __typename?: 'Room';
  address: Scalars['String']['output'];
  ascId?: Maybe<Scalars['String']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  number: Scalars['String']['output'];
};

export type RoomFilterInput = {
  address?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<RoomFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  number?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<RoomFilterInput>>;
};

export type RoomSortInput = {
  address?: InputMaybe<SortEnumType>;
  ascId?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StableCard = {
  __typename?: 'StableCard';
  cabinet: Room;
  dayOfWeek: DayOfWeek;
  id: Scalars['Int']['output'];
  isWeekEven: Scalars['Boolean']['output'];
  lessonTime: LessonTime;
  lessonTimeId: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  relatedTimetableId: Scalars['Int']['output'];
  roomId: Scalars['Int']['output'];
  subGroup: SubGroup;
  subject: Subject;
  subjectId: Scalars['Int']['output'];
  teacher: Teacher;
  teacherId: Scalars['Int']['output'];
};

export type StableCardFilterInput = {
  and?: InputMaybe<Array<StableCardFilterInput>>;
  cabinet?: InputMaybe<RoomFilterInput>;
  dayOfWeek?: InputMaybe<DayOfWeekOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isWeekEven?: InputMaybe<BooleanOperationFilterInput>;
  lessonTime?: InputMaybe<LessonTimeFilterInput>;
  lessonTimeId?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<StableCardFilterInput>>;
  relatedTimetable?: InputMaybe<StableTimetableFilterInput>;
  relatedTimetableId?: InputMaybe<IntOperationFilterInput>;
  roomId?: InputMaybe<IntOperationFilterInput>;
  subGroup?: InputMaybe<SubGroupOperationFilterInput>;
  subject?: InputMaybe<SubjectFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  teacher?: InputMaybe<TeacherFilterInput>;
  teacherId?: InputMaybe<IntOperationFilterInput>;
};

export type StableCardSortInput = {
  cabinet?: InputMaybe<RoomSortInput>;
  dayOfWeek?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isWeekEven?: InputMaybe<SortEnumType>;
  lessonTime?: InputMaybe<LessonTimeSortInput>;
  lessonTimeId?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  relatedTimetable?: InputMaybe<StableTimetableSortInput>;
  relatedTimetableId?: InputMaybe<SortEnumType>;
  roomId?: InputMaybe<SortEnumType>;
  subGroup?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SubjectSortInput>;
  subjectId?: InputMaybe<SortEnumType>;
  teacher?: InputMaybe<TeacherSortInput>;
  teacherId?: InputMaybe<SortEnumType>;
};

export type StableTimetable = {
  __typename?: 'StableTimetable';
  cards?: Maybe<Array<StableCard>>;
  group?: Maybe<Group>;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
};

export type StableTimetableFilterInput = {
  and?: InputMaybe<Array<StableTimetableFilterInput>>;
  cards?: InputMaybe<StableCardFilterInput>;
  group?: InputMaybe<GroupFilterInput>;
  groupId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<StableTimetableFilterInput>>;
};

export type StableTimetableSortInput = {
  group?: InputMaybe<GroupSortInput>;
  groupId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
};

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum SubGroup {
  All = 'ALL',
  Females = 'FEMALES',
  FirstGroup = 'FIRST_GROUP',
  Males = 'MALES',
  SecondGroup = 'SECOND_GROUP'
}

export type SubGroupOperationFilterInput = {
  eq?: InputMaybe<SubGroup>;
  in?: InputMaybe<Array<SubGroup>>;
  neq?: InputMaybe<SubGroup>;
  nin?: InputMaybe<Array<SubGroup>>;
};

export type Subject = {
  __typename?: 'Subject';
  ascId?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  modifiedAt: Scalars['DateTime']['output'];
  name: Scalars['String']['output'];
};

export type SubjectFilterInput = {
  and?: InputMaybe<Array<SubjectFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SubjectFilterInput>>;
};

export type SubjectSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

export type Teacher = {
  __typename?: 'Teacher';
  ascId?: Maybe<Scalars['String']['output']>;
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  middlename: Scalars['String']['output'];
  modifiedAt: Scalars['DateTime']['output'];
};

export type TeacherFilterInput = {
  and?: InputMaybe<Array<TeacherFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  firstname?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastname?: InputMaybe<StringOperationFilterInput>;
  middlename?: InputMaybe<StringOperationFilterInput>;
  modifiedAt?: InputMaybe<DateTimeOperationFilterInput>;
  or?: InputMaybe<Array<TeacherFilterInput>>;
};

export type TeacherSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  firstname?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastname?: InputMaybe<SortEnumType>;
  middlename?: InputMaybe<SortEnumType>;
  modifiedAt?: InputMaybe<SortEnumType>;
};
