import img_back from './img_back.png'
import img_close from './img_close.png'
import img_expand from './img_expand.png'
import img_marker from './img_marker.png'
import img_minus from './img_minus.png'
import img_plus from './img_plus.png'
import img_rating from './img_rating.png'
import img_send from './img_send.png'
import notification_new_comment from './notification_new_comment.png'
import notification_new_request from './notification_new_request.png'
import notification_request_approved from './notification_request_approved.png'
import plan_meta_comments from './plan_meta_comments.png'
import plan_meta_distance from './plan_meta_distance.png'
import plan_meta_going from './plan_meta_going.png'
import plan_type_beach from './plan_type_beach.png'
import plan_type_concert from './plan_type_concert.png'
import plan_type_educational from './plan_type_educational.png'
import plan_type_movie from './plan_type_movie.png'
import plan_type_road_trip from './plan_type_road_trip.png'
import plan_type_shopping from './plan_type_shopping.png'
import planbear from './planbear.png'
import tab_create from './tab_create.png'
import tab_notifications from './tab_notifications.png'
import tab_plans from './tab_plans.png'
import tab_profile from './tab_profile.png'

export const nav: any = {
  Create: tab_create,
  Plans: tab_plans,
  Notifications: tab_notifications,
  Profile: tab_profile
}

export const planMeta = {
  comments: plan_meta_comments,
  distance: plan_meta_distance,
  going: plan_meta_going
}

export const planType: any = {
  beach: plan_type_beach,
  concert: plan_type_concert,
  educational: plan_type_educational,
  movie: plan_type_movie,
  road_trip: plan_type_road_trip,
  shopping: plan_type_shopping
}

export const notificationAction: any = {
  new_comment: notification_new_comment,
  new_request: notification_new_request,
  request_approved: notification_request_approved
}

export {
  img_back,
  img_close,
  img_expand,
  img_marker,
  img_minus,
  img_plus,
  img_rating,
  img_send,
  planbear
}
