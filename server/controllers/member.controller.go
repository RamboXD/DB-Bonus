package controllers

import (
	"net/http"

	"github.com/RamboXD/DB-Bonus/models"
	"github.com/gin-gonic/gin"

	"gorm.io/gorm"
)

type MemberController struct {
	DB *gorm.DB
}

func NewMemberController(DB *gorm.DB) MemberController {
	return MemberController{DB}
}

/*
Barlyk komekshilerdi tabu
=====================================================================================================================
*/

func (mc *MemberController) GetCaregivers(ctx *gin.Context) {
    var caregivers []models.Caregiver

    result := mc.DB.Find(&caregivers)
    if result.Error != nil {
        ctx.JSON(http.StatusInternalServerError, gin.H{"status": "error", "message": "Could not retrieve caregivers"})
        return
    }

    ctx.JSON(http.StatusOK, gin.H{"status": "success", "caregivers": caregivers})
}

