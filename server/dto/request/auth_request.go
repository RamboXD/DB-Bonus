package request

import "github.com/RamboXD/DB-Bonus/models"




type SignUpInput struct {
	Name            string `json:"name" binding:"required"`
	Email           string `json:"email" binding:"required"`
	Password        string `json:"password" binding:"required,min=8"`
	Photo           string `json:"photo" binding:"required"`
}

type SignInInput struct {
	Email    string `json:"email"  binding:"required"`
	Password string `json:"password"  binding:"required"`
}

type MemberSignUpInput struct {
    User   *models.User   `json:"user"`
    Member *models.Member `json:"member"`
}

type CaregiverSignUpInput struct {
    User  *models.User  `json:"user"`
    Caregiver *models.Caregiver `json:"caregiver"`
}

type MaintenancePersonSignUpInput struct {
    User              *models.User             `json:"user"`
    // MaintenancePerson *models.MaintenancePerson `json:"maintenance_person"`
}

type FuelingPersonSignUpInput struct {
    User          *models.User          `json:"user"`
    // FuelingPerson *models.FuelingPerson `json:"fueling_person"`
}