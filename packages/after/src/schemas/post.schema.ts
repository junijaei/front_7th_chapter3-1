import { z } from 'zod';

export const postFormSchema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요')
    .min(5, '제목은 5자 이상이어야 합니다.')
    .max(100, '제목은 100자 이내로 입력해주세요')
    .refine(
      (val) => !['광고', '스팸', '홍보'].some((word) => val.includes(word)),
      '제목에 금지된 단어가 포함되어 있습니다'
    ),
  content: z.string().optional(),
  author: z
    .string()
    .min(1, '작성자명을 입력해주세요')
    .max(50, '작성자명은 50자 이내로 입력해주세요'),
  category: z.enum(['development', 'design', 'accessibility'], '카테고리를 선택해주세요'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export type PostFormSchema = z.infer<typeof postFormSchema>;
