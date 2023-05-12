import { View, Text } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PaginationProps {
  totalPages: number,
  currentPage: number,
  onClick: (page: number) => void
}

export default function Pagination({ totalPages, currentPage, onClick }: PaginationProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((page, index) => (
        <TouchableOpacity key={index} onPress={() => onClick(page)} style={[styles.page, page === currentPage && styles.pageActive]}>
          <Text style={[styles.pageText, page === currentPage && styles.pageTextActive]}>{page}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}