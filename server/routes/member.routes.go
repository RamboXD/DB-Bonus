package routes

import (
	"github.com/RamboXD/DB-Bonus/controllers"
	"github.com/RamboXD/DB-Bonus/middleware"
	"github.com/gin-gonic/gin"
)

type MemberRouteController struct {
	memberController controllers.MemberController
}

func NewMemberRouteController(memberController controllers.MemberController) MemberRouteController {
	return MemberRouteController{memberController}
}

func (rc *MemberRouteController) MemberRoute(rg *gin.RouterGroup) {
    memberRouter := rg.Group("/member")

    memberRouter.GET("/getCaregivers", middleware.MemberCheck(), rc.memberController.GetCaregivers) 
}

