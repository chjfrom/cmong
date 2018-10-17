   
function loginValueCheck(){
    if ($("#u_id").val() == ""){
        alert('[ID 입력 오류] 유효한 ID를 입력해 주세요.');
        $("#u_id").focus();
        return false;
    } else if ($("#u_name").val() == "") {
        alert('[이름 입력 오류] 유효한 이름을 입력해 주세요.');
        $("#u_name").focus();
        return false;
    } else if ($("#u_pw").val() == "") {
        alert('[비밀번호 오류] 유효한 비밀번호를 입력해 주세요.');
        $("#u_pw").focus();
        return false;
    } else if ($("#u_phon").val() == "") {
        alert('[핸드폰번호 오류] 유효한 핸드폰번호를 입력해 주세요.');
        $("#u_phon").focus();
        return false;
    } else if ($("#u_email").val() == "") {
        alert('[이메일 오류] 유효한 이메일을 입력해 주세요.');
        $("#u_email").focus();
        return false;
    } else if ($("#u_pw").val() != $("#u_pwC").val()){
        alert('[비밀번호 오류] 동일한 비밀번호를 입력해 주세요.');
        $("#u_email").focus();
        return false;    
    } else {
        $("#f").submit(); 
        alert("회원가입성공")
    }     
} 
