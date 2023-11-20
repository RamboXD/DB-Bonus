package response

import (
	"time"

	"github.com/RamboXD/DB-Bonus/models"
	"github.com/google/uuid"
)


type UserResponse struct {
    ID                  uuid.UUID
    Email               string
    GivenName           string
    Surname             string
    City                string
    PhoneNumber         string
    ProfileDescription  string
    CreatedAt           time.Time
    UpdatedAt           time.Time
    CaregiverDetails    *CaregiverDetails    // Optional
    MemberDetails       *MemberDetails       // Optional
}

type CaregiverDetails struct {
    CaregiverUserID  uuid.UUID
    Photo            []byte
    Gender           string
    CaregivingType   string
    HourlyRate       float64
    // Add other fields as needed
}

type MemberDetails struct {
    MemberUserID  uuid.UUID
    HouseRules    string
    // Add other fields as needed
}


func NewUserResponse(user models.User, caregiver *models.Caregiver, member *models.Member) *UserResponse {
    userResp := &UserResponse{
        ID:                   user.UserID, // UUID type
        Email:                user.Email,
        GivenName:            user.GivenName,
        Surname:              user.Surname,
        City:                 user.City,
        PhoneNumber:          user.PhoneNumber,
        ProfileDescription:   user.ProfileDescription,
 
    }

    if caregiver != nil {
        userResp.CaregiverDetails = &CaregiverDetails{
            CaregiverUserID:  caregiver.CaregiverUserID,
            Photo:            caregiver.Photo, // Assuming this is a []byte representing an image
            Gender:           caregiver.Gender,
            CaregivingType:   caregiver.CaregivingType,
            HourlyRate:       caregiver.HourlyRate,
            // Add more fields from the Caregiver model as needed
        }
    }

    if member != nil {
        userResp.MemberDetails = &MemberDetails{
            MemberUserID: member.MemberUserID,
            HouseRules:   member.HouseRules,
            // Add more fields from the Member model as needed
        }
    }

    return userResp
}