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
  owner: Scalars['Boolean']
}

export type Meta = {
  __typename?: 'Meta'
  comments: Scalars['Int']
  distance: Scalars['Float']
  going: Scalars['Int']
}

export type Mutation = {
  __typename?: 'Mutation'
  approveMember?: Maybe<Result>
  createComment?: Maybe<Comment>
  createPlan?: Maybe<Plan>
  joinPlan?: Maybe<Plan>
  login?: Maybe<AuthResult>
  register?: Maybe<AuthResult>
  removeComment?: Maybe<Result>
  removeMember?: Maybe<Result>
  updateProfile?: Maybe<User>
}

export type MutationApproveMemberArgs = {
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
  notifications?: Maybe<Scalars['Boolean']>
}

export type Plan = {
  __typename?: 'Plan'
  id: Scalars['ID']
  comments?: Maybe<Array<Comment>>
  description: Scalars['String']
  expires?: Maybe<Scalars['String']>
  max?: Maybe<Scalars['Int']>
  members?: Maybe<Array<Member>>
  meta: Meta
  status: Scalars['String']
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
  notifications: Scalars['Boolean']
  created: Scalars['String']
  updated: Scalars['String']
}
