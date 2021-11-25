json.bookings do
  json.array! @bookings do |booking|
    json.id booking.id
    json.property booking.property.title
    json.city booking.property.city
    json.country booking.property.country
    json.guest booking.user.username
    json.start_date booking.start_date
    json.end_date booking.end_date
    json.paid booking.charges.pluck(:complete).include?(true)
  end
end
