import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm, ValidationError } from "@formspree/react";

export default function Feedback() {
  const [state, handleSubmit] = useForm("meqdbykn");
  if (state.succeeded) {
    return <p>Thanks for the feedback!</p>;
  }
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      w="full"
      p={8}
      maxW="2xl"
      direction={"column"}
      gap={4}
    >
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="your-email@example.com"
          variant="filled"
        />
      </FormControl>
      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <FormControl>
        <FormLabel>Message</FormLabel>
        <Textarea
          id="message"
          name="message"
          placeholder="Your feedback here..."
          variant="filled"
        />
      </FormControl>
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <Button
        type="submit"
        isLoading={state.submitting}
        loadingText="Submitting..."
      >
        Submit
      </Button>
    </Flex>
  );
}
