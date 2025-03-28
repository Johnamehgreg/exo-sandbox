import { Box, List, Transition } from "@mantine/core";

interface Props {
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

export const PasswordCheck: React.FC<Props> = ({
  password,
  email = "",
  firstName = "",
  lastName = "",
}) => {

  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const upperCasePattern = /[A-Z]/;
  const lowerCasePattern = /[a-z]/;
  const numberPattern = /[0-9]/;
  const emailValue = email.toLowerCase() || null;
  const firstValue = firstName.toLowerCase() || null;
  const lastValue = lastName.toLowerCase() || null;
  const upperPassword = password.toLowerCase();

  const ratePasswordStrength = () => {
    let strength = 0;
    if (specialCharPattern.test(password)) strength++;
    if (upperCasePattern.test(password)) strength++;
    if (lowerCasePattern.test(password)) strength++;
    if (numberPattern.test(password)) strength++;
    if (!upperPassword.includes(`${firstValue}`)) strength++;
    if (!upperPassword.includes(`${emailValue}`)) strength++;
    if (!upperPassword.includes(`${lastValue}`)) strength++;
    if (strength === 3 && password.length >=1) {
      return "weak";
    } else if (strength >= 6 && strength < 7 && password.length >=1) {
      return "moderate";
    } else if (strength === 7 && password.length >=1) {
      return "strong";
    } else {
      return "weak";
    }
  };

  const getStrengthColor = () => {
    switch (ratePasswordStrength()) {
        case "weak":
            return "text-red-400";
        case "strong":
            return "text-vibrantgreen";
    }
};

  const getColor = (active: boolean) => {
    if (active && password.length >= 1) {
      return "text-vibrantgreen";
    }
    return "text-red-400";
  };

  const hasNameOrEmail = firstName.trim() !== "" || lastName.trim() !== "" || email.trim() !== "";
  const pExit =
    hasNameOrEmail &&
    !upperPassword.includes(`${firstValue}`) &&
    !upperPassword.includes(`${emailValue}`) &&
    !upperPassword.includes(`${lastValue}`);
  
  return (
    <Transition mounted transition="fade-right" duration={400} timingFunction="ease">
      {(styles) => (
        <Box style={styles} mb="lg">
          <div>
          <span className={` flex items-center gap-1`}>
              <p className="text-[12px] font-[700]">Password strength:{" "}</p>
              <span className={`} flex items-center gap-1`}>

              <p
                className={`${password.length && getStrengthColor()}  text-[12px] font-[700] `}
               >
                {ratePasswordStrength()}
              </p>
              </span>
              </span>
              <div className={`text-[12px] mb-[0.2rem]`}>    
                Your password must have:
              </div>
            <List listStyleType="disc" >
             
              <List.Item
                key="length"
                mb="0.2rem"
                className={  getColor(password.length >= 8 && password.length <= 64)}
                fz="xs"
              >
                Must be 8 - 64 characters long
              </List.Item>
              <List.Item
                key="case"
                mb="0.2rem"
                className={getColor(upperCasePattern.test(password) && lowerCasePattern.test(password))}
                fz="xs"
              >
                Must contain lowercase and uppercase characters
              </List.Item>
              <List.Item
                key="number"
                mb="0.2rem"
                className={getColor(numberPattern.test(password))}
                fz="xs"
              >
                Must contain number characters
              </List.Item>
              <List.Item key="name-email" mb="0.2rem" className={getColor(hasNameOrEmail && pExit)} fz="xs">
                Cannot contain your name or email address
              </List.Item>
              <List.Item
                key="special"
                mb="0.2rem"
                className={getColor(specialCharPattern.test(password))}
                fz="xs"
              >
                Must contain a special character
              </List.Item>
            </List>
          </div>
        </Box>
      )}
    </Transition>
  );
};
