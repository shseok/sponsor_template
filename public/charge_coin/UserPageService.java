//코인 잔액 충전
public void chargePoint(int id,int amount){
        User user = userRepository.findById(id).get();
        user.setMoney(amount);
        userRepository.save(user);
        }