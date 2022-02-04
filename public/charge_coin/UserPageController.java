//코인 잔액 충전
@Transactional
    @GetMapping("/user/{id}/cash")
    public String myCash(@PathVariable("id") Integer id,Model model,@AuthenticationPrincipal PrincipalDetails principalDetails){
            // 로그인 User == 접속 User
            if(principalDetails.getUser().getId() == id){
            // User의 후원내역을 가져온다.
                User user = userPageService.findUser(id);
                model.addAttribute("user",user);

            return "/user/cash";
            }else{
                return "redirect:/main";
            }
    }
//충전 처리
    @GetMapping("/user/charge/point")
    public String myCashPro(int amount,@AuthenticationPrincipal PrincipalDetails principalDetails){
            User user = userPageService.findUser(principalDetails.getUser().getId());
            userPageService.chargePoint(user.getId(),amount);
            return "redirect:/main";
            }