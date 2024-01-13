/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  cabinet: Cabinet;
  cabinetId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  isCanceled: Scalars['Boolean']['output'];
  isModified: Scalars['Boolean']['output'];
  isMoved: Scalars['Boolean']['output'];
  lessonTime: LessonTime;
  lessonTimeId: Scalars['Int']['output'];
  relatedTimetableId: Scalars['Int']['output'];
  subGroup: SubGroup;
  subject: Subject;
  subjectId: Scalars['Int']['output'];
  teacher: Teacher;
  teacherId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ActualCardFilterInput = {
  and?: InputMaybe<Array<ActualCardFilterInput>>;
  cabinet?: InputMaybe<CabinetFilterInput>;
  cabinetId?: InputMaybe<IntOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  date?: InputMaybe<DateOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isCanceled?: InputMaybe<BooleanOperationFilterInput>;
  isModified?: InputMaybe<BooleanOperationFilterInput>;
  isMoved?: InputMaybe<BooleanOperationFilterInput>;
  lessonTime?: InputMaybe<LessonTimeFilterInput>;
  lessonTimeId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ActualCardFilterInput>>;
  relatedTimetable?: InputMaybe<ActualTimetableFilterInput>;
  relatedTimetableId?: InputMaybe<IntOperationFilterInput>;
  subGroup?: InputMaybe<SubGroupOperationFilterInput>;
  subject?: InputMaybe<SubjectFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  teacher?: InputMaybe<TeacherFilterInput>;
  teacherId?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type ActualCardSortInput = {
  cabinet?: InputMaybe<CabinetSortInput>;
  cabinetId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  date?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isCanceled?: InputMaybe<SortEnumType>;
  isModified?: InputMaybe<SortEnumType>;
  isMoved?: InputMaybe<SortEnumType>;
  lessonTime?: InputMaybe<LessonTimeSortInput>;
  lessonTimeId?: InputMaybe<SortEnumType>;
  relatedTimetable?: InputMaybe<ActualTimetableSortInput>;
  relatedTimetableId?: InputMaybe<SortEnumType>;
  subGroup?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SubjectSortInput>;
  subjectId?: InputMaybe<SortEnumType>;
  teacher?: InputMaybe<TeacherSortInput>;
  teacherId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type ActualTimetable = {
  __typename?: 'ActualTimetable';
  cards?: Maybe<Array<ActualCard>>;
  createdAt: Scalars['DateTime']['output'];
  group: Group;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
  weekNumber: Scalars['Int']['output'];
};

export type ActualTimetableFilterInput = {
  and?: InputMaybe<Array<ActualTimetableFilterInput>>;
  cards?: InputMaybe<ActualCardFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  group?: InputMaybe<GroupFilterInput>;
  groupId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<ActualTimetableFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
  weekNumber?: InputMaybe<IntOperationFilterInput>;
};

export type ActualTimetableSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  group?: InputMaybe<GroupSortInput>;
  groupId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
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

export type Cabinet = {
  __typename?: 'Cabinet';
  address: Scalars['String']['output'];
  ascId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  number: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CabinetFilterInput = {
  address?: InputMaybe<StringOperationFilterInput>;
  and?: InputMaybe<Array<CabinetFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  fullName?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  number?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<CabinetFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type CabinetSortInput = {
  address?: InputMaybe<SortEnumType>;
  ascId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  fullName?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type GroupFilterInput = {
  and?: InputMaybe<Array<GroupFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<GroupFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type GroupSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
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
  createdAt: Scalars['DateTime']['output'];
  endsAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  number: Scalars['Int']['output'];
  startsAt: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type LessonTimeFilterInput = {
  and?: InputMaybe<Array<LessonTimeFilterInput>>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  endsAt: Scalars['String']['input'];
  id?: InputMaybe<IntOperationFilterInput>;
  number?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<LessonTimeFilterInput>>;
  startsAt: Scalars['String']['input'];
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type LessonTimeSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  endsAt: Scalars['String']['input'];
  id?: InputMaybe<SortEnumType>;
  number?: InputMaybe<SortEnumType>;
  startsAt: Scalars['String']['input'];
  updatedAt?: InputMaybe<SortEnumType>;
};

export type Query = {
  __typename?: 'Query';
  actualCards: Array<ActualCard>;
  actualTimetables: Array<ActualTimetable>;
  cabinets: Array<Cabinet>;
  groups: Array<Group>;
  lessonTimes: Array<LessonTime>;
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


export type QueryCabinetsArgs = {
  order?: InputMaybe<Array<CabinetSortInput>>;
  where?: InputMaybe<CabinetFilterInput>;
};


export type QueryGroupsArgs = {
  order?: InputMaybe<Array<GroupSortInput>>;
  where?: InputMaybe<GroupFilterInput>;
};


export type QueryLessonTimesArgs = {
  order?: InputMaybe<Array<LessonTimeSortInput>>;
  where?: InputMaybe<LessonTimeFilterInput>;
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

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StableCard = {
  __typename?: 'StableCard';
  cabinet: Cabinet;
  cabinetId: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  dayOfWeek: DayOfWeek;
  id: Scalars['Int']['output'];
  isWeekEven: Scalars['Boolean']['output'];
  lessonTime: LessonTime;
  lessonTimeId: Scalars['Int']['output'];
  relatedTimetableId: Scalars['Int']['output'];
  subGroup: SubGroup;
  subject: Subject;
  subjectId: Scalars['Int']['output'];
  teacher: Teacher;
  teacherId: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StableCardFilterInput = {
  and?: InputMaybe<Array<StableCardFilterInput>>;
  cabinet?: InputMaybe<CabinetFilterInput>;
  cabinetId?: InputMaybe<IntOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  dayOfWeek?: InputMaybe<DayOfWeekOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  isWeekEven?: InputMaybe<BooleanOperationFilterInput>;
  lessonTime?: InputMaybe<LessonTimeFilterInput>;
  lessonTimeId?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<StableCardFilterInput>>;
  relatedTimetable?: InputMaybe<StableTimetableFilterInput>;
  relatedTimetableId?: InputMaybe<IntOperationFilterInput>;
  subGroup?: InputMaybe<SubGroupOperationFilterInput>;
  subject?: InputMaybe<SubjectFilterInput>;
  subjectId?: InputMaybe<IntOperationFilterInput>;
  teacher?: InputMaybe<TeacherFilterInput>;
  teacherId?: InputMaybe<IntOperationFilterInput>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type StableCardSortInput = {
  cabinet?: InputMaybe<CabinetSortInput>;
  cabinetId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  dayOfWeek?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  isWeekEven?: InputMaybe<SortEnumType>;
  lessonTime?: InputMaybe<LessonTimeSortInput>;
  lessonTimeId?: InputMaybe<SortEnumType>;
  relatedTimetable?: InputMaybe<StableTimetableSortInput>;
  relatedTimetableId?: InputMaybe<SortEnumType>;
  subGroup?: InputMaybe<SortEnumType>;
  subject?: InputMaybe<SubjectSortInput>;
  subjectId?: InputMaybe<SortEnumType>;
  teacher?: InputMaybe<TeacherSortInput>;
  teacherId?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type StableTimetable = {
  __typename?: 'StableTimetable';
  cards?: Maybe<Array<StableCard>>;
  createdAt: Scalars['DateTime']['output'];
  group?: Maybe<Group>;
  groupId: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type StableTimetableFilterInput = {
  and?: InputMaybe<Array<StableTimetableFilterInput>>;
  cards?: InputMaybe<StableCardFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  group?: InputMaybe<GroupFilterInput>;
  groupId?: InputMaybe<IntOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<StableTimetableFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type StableTimetableSortInput = {
  createdAt?: InputMaybe<SortEnumType>;
  group?: InputMaybe<GroupSortInput>;
  groupId?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
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
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type SubjectFilterInput = {
  and?: InputMaybe<Array<SubjectFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<SubjectFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type SubjectSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type Teacher = {
  __typename?: 'Teacher';
  ascId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  firstname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastname: Scalars['String']['output'];
  middlename: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type TeacherFilterInput = {
  and?: InputMaybe<Array<TeacherFilterInput>>;
  ascId?: InputMaybe<StringOperationFilterInput>;
  createdAt?: InputMaybe<DateTimeOperationFilterInput>;
  firstname?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  lastname?: InputMaybe<StringOperationFilterInput>;
  middlename?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TeacherFilterInput>>;
  updatedAt?: InputMaybe<DateTimeOperationFilterInput>;
};

export type TeacherSortInput = {
  ascId?: InputMaybe<SortEnumType>;
  createdAt?: InputMaybe<SortEnumType>;
  firstname?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  lastname?: InputMaybe<SortEnumType>;
  middlename?: InputMaybe<SortEnumType>;
  updatedAt?: InputMaybe<SortEnumType>;
};

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: number, name: string }> };

export type ActualTimetablesQueryVariables = Exact<{
  groupId: Scalars['Int']['input'];
  weekNumber: Scalars['Int']['input'];
}>;


export type ActualTimetablesQuery = { __typename?: 'Query', actualTimetables: Array<{ __typename?: 'ActualTimetable', weekNumber: number, group: { __typename?: 'Group', id: number, name: string }, cards?: Array<{ __typename?: 'ActualCard', date: string, isModified: boolean, isCanceled: boolean, isMoved: boolean, subGroup: SubGroup, id: number, cabinet: { __typename?: 'Cabinet', id: number, number: string, address: string }, teacher: { __typename?: 'Teacher', id: number, firstname: string, lastname: string }, subject: { __typename?: 'Subject', name: string, id: number }, lessonTime: { __typename?: 'LessonTime', endsAt: string, startsAt: string, id: number, number: number } }> | null }> };


export const GroupsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GroupsQuery, GroupsQueryVariables>;
export const ActualTimetablesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ActualTimetables"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"weekNumber"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"actualTimetables"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"groupId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupId"}}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"weekNumber"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"weekNumber"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"weekNumber"}},{"kind":"Field","name":{"kind":"Name","value":"cards"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cabinet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"teacher"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"firstname"}},{"kind":"Field","name":{"kind":"Name","value":"lastname"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"isModified"}},{"kind":"Field","name":{"kind":"Name","value":"isCanceled"}},{"kind":"Field","name":{"kind":"Name","value":"isMoved"}},{"kind":"Field","name":{"kind":"Name","value":"subGroup"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"lessonTime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endsAt"}},{"kind":"Field","name":{"kind":"Name","value":"startsAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ActualTimetablesQuery, ActualTimetablesQueryVariables>;