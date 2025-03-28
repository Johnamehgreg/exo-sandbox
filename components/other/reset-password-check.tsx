import { Box, List, Text, Transition } from '@mantine/core';

interface Props {
  password: string;
  confirmPassword: string;
}

export const ResetPasswordCheck: React.FC<Props> = ({
  password,
  confirmPassword,
}) => {
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const upperCasePattern = /[A-Z]/;
  const lowerCasePattern = /[a-z]/;
  const numberPattern = /[0-9]/;
  const matchPassword = () => {
    if (
      password === confirmPassword &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      return true;
    }
    return false;
  };
  // const upperPassword = password.toLowerCase()

  const ratePasswordStrength = () => {
    let strength = 0;
    if (specialCharPattern.test(password)) strength++;
    if (upperCasePattern.test(password)) strength++;
    if (lowerCasePattern.test(password)) strength++;
    if (numberPattern.test(password)) strength++;
    if (matchPassword()) strength++;

    if (strength === 2) {
      return 'weak';
    } else if (strength >= 3 && strength <= 4) {
      return 'moderate';
    } else if (strength === 5) {
      return 'strong';
    } else {
      return 'weak';
    }
  };

  const getStrengthColor = () => {
    switch (ratePasswordStrength()) {
      case 'weak':
        return '#56626C';
      case 'strong':
        return '#3A7D44';
    }
  };

  const getColor = (active: boolean) => {
    if (active) {
      return '#3A7D44';
    }
    return '#56626C';
  };

  return (
    <>
      <Transition
        mounted={true}
        transition="fade-right"
        duration={400}
        timingFunction="ease"
      >
        {(styles) => (
          <Box style={styles} mb={'lg'}>
            <Box fz={'12px'} fw={500}>
              Password strength:{' '}
              <Box
                fw={700}
                fz={'12px'}
                tt={'capitalize'}
                c={getStrengthColor()}
                component="span"
              >
                {ratePasswordStrength()}
              </Box>
              <>
                <List listStyleType="disc" c={getStrengthColor()}>
                  <Text mb={'0.2rem'} c={getStrengthColor()} fz={'xs'}>
                    Your password must have:
                  </Text>
                  <List.Item
                    mb={'0.2rem'}
                    c={getColor(password.length > 6 && password.length <= 64)}
                    fz={'xs'}
                  >
                    Must be 8 - 64 characters long
                  </List.Item>
                  <List.Item
                    mb={'0.2rem'}
                    c={getColor(
                      upperCasePattern.test(password) &&
                        lowerCasePattern.test(password)
                    )}
                    fz={'xs'}
                  >
                    Must contain lowercase and uppercase characters
                  </List.Item>
                  <List.Item
                    mb={'0.2rem'}
                    c={getColor(numberPattern.test(password))}
                    fz={'xs'}
                  >
                    Must contain number characters
                  </List.Item>
                  <List.Item
                    mb={'0.2rem'}
                    c={getColor(specialCharPattern.test(password))}
                    fz={'xs'}
                  >
                    Must contain a special character
                  </List.Item>
                  <List.Item
                    mb={'0.2rem'}
                    c={getColor(matchPassword())}
                    fz={'xs'}
                  >
                    Passwords must match
                  </List.Item>
                </List>
              </>
            </Box>
          </Box>
        )}
      </Transition>
    </>
  );
};
