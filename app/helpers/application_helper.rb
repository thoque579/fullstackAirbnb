module ApplicationHelper

  def is_paid?
    self.charges.pluck(:complete).include?(true)
  end
  
end
