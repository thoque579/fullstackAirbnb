json.booking do
  json.id @booking.property.id
  json.title @booking.property.title
  json.city @booking.property.city
  json.country @booking.property.country
  json.property_type @booking.property.property_type
  json.start @booking.start_date
  json.end @booking.end_date
  json.price @booking.charges[0].amount
  json.hostUser @booking.property.user.username
  json.bookedUser @booking.user.username
  json.paid @booking.charges[0].complete?
end
