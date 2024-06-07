import { HStack, IconButton } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <HStack>
      {stars.map((star) => (
        <IconButton key={star} icon={<FaStar />} color={star <= rating ? "yellow.400" : "gray.300"} onClick={() => onRate(star)} aria-label={`${star} star`} />
      ))}
    </HStack>
  );
};

export default StarRating;
