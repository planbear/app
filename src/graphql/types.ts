export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type AuthResult = {
  __typename?: 'AuthResult'
  token: Scalars['String']
  user: User
}

export type Comment = {
  __typename?: 'Comment'
  id: Scalars['ID']
  body: Scalars['String']
  pinned: Scalars['Boolean']
  user: User
  created: Scalars['String']
}

export type LocationInput = {
  latitude: Scalars['Float']
  longitude: Scalars['Float']
}

export type Member = {
  __typename?: 'Member'
  id: Scalars['ID']
  approved: Scalars['Boolean']
  joined: Scalars['String']
  name: Scalars['String']
  rating: Scalars['Float']
  owner: Scalars['Boolean']
}

export type Meta = {
  __typename?: 'Meta'
  comments: Scalars['Int']
  distance: Scalars['Float']
  going: Scalars['Int']
  max?: Maybe<Scalars['Int']>
}

export type Mutation = {
  __typename?: 'Mutation'
  approveMember?: Maybe<Result>
  blockMember?: Maybe<Result>
  createComment?: Maybe<Comment>
  createPlan?: Maybe<Plan>
  joinPlan?: Maybe<Plan>
  login?: Maybe<AuthResult>
  rateUser?: Maybe<Result>
  register?: Maybe<AuthResult>
  removeComment?: Maybe<Result>
  removeMember?: Maybe<Result>
  updateProfile?: Maybe<User>
}

export type MutationApproveMemberArgs = {
  planId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationBlockMemberArgs = {
  planId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationCreateCommentArgs = {
  planId: Scalars['ID']
  body: Scalars['String']
  pinned?: Maybe<Scalars['Boolean']>
}

export type MutationCreatePlanArgs = {
  plan: PlanInput
}

export type MutationJoinPlanArgs = {
  planId: Scalars['ID']
  location: LocationInput
}

export type MutationLoginArgs = {
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationRateUserArgs = {
  planId: Scalars['ID']
  userId: Scalars['ID']
  rating: Scalars['Int']
}

export type MutationRegisterArgs = {
  name: Scalars['String']
  email: Scalars['String']
  password: Scalars['String']
}

export type MutationRemoveCommentArgs = {
  planId: Scalars['ID']
  commentId: Scalars['ID']
}

export type MutationRemoveMemberArgs = {
  planId: Scalars['ID']
  userId: Scalars['ID']
}

export type MutationUpdateProfileArgs = {
  name?: Maybe<Scalars['String']>
  push?: Maybe<Scalars['Boolean']>
}

export type Notification = {
  __typename?: 'Notification'
  action: NotificationAction
  id: Scalars['ID']
  source: NotificationTarget
  target: NotificationTarget
  user: User
  created: Scalars['String']
  updated: Scalars['String']
}

export enum NotificationAction {
  NewRequest = 'new_request',
  NewComment = 'new_comment',
  RequestApproved = 'request_approved'
}

export type NotificationTarget = Plan | User

export type Plan = {
  __typename?: 'Plan'
  id: Scalars['ID']
  comments?: Maybe<Array<Comment>>
  description: Scalars['String']
  expires?: Maybe<Scalars['String']>
  members?: Maybe<Array<Member>>
  meta: Meta
  status: PlanStatus
  time: Scalars['String']
  type: PlanType
  user: User
  created: Scalars['String']
  updated: Scalars['String']
}

export type PlanInput = {
  description: Scalars['String']
  expires?: Maybe<Scalars['String']>
  location: LocationInput
  max?: Maybe<Scalars['Int']>
  time: Scalars['String']
  type: PlanType
}

export enum PlanStatus {
  Joined = 'joined',
  New = 'new',
  Requested = 'requested'
}

export enum PlanType {
  Beach = 'beach',
  Concert = 'concert',
  Educational = 'educational',
  Movie = 'movie',
  RoadTrip = 'road_trip',
  Shopping = 'shopping'
}

export type Query = {
  __typename?: 'Query'
  notifications?: Maybe<Array<Maybe<Notification>>>
  plan?: Maybe<Plan>
  plans?: Maybe<Array<Maybe<Plan>>>
  profile?: Maybe<User>
}

export type QueryPlanArgs = {
  planId: Scalars['ID']
  location: LocationInput
}

export type QueryPlansArgs = {
  location: LocationInput
  radius: Scalars['Int']
}

export type Result = {
  __typename?: 'Result'
  success: Scalars['Boolean']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['String']
  name: Scalars['String']
  push: Scalars['Boolean']
  rating: Scalars['Float']
  created: Scalars['String']
  updated: Scalars['String']
}
