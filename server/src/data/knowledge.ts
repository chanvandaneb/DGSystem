export interface KnowledgeArticle {
  id: string
  title: string
  category: string
  categorySlug: string
  author: string
  excerpt: string
  pinned: boolean
}

export interface KnowledgeCategory {
  slug: string
  name: string
  description: string
}

export const knowledgeCategories: KnowledgeCategory[] = [
  { slug: 'company', name: 'Company', description: 'About company policies and workflow' },
  { slug: 'seo', name: 'SEO', description: 'About SEO knowledge' },
  { slug: 'telesale', name: 'Telesale', description: 'About telesale scripts and process' },
  { slug: 'general', name: 'Kiến thức chung', description: 'About about Knowledge' },
  { slug: 'game', name: 'Kiến thức Game', description: 'About game knowledge' },
  { slug: 'fi88', name: 'Kiến thức Fi88', description: 'About Fi88 knowledge' },
  { slug: 'leaders', name: 'Leaders', description: 'About leadership resources' },
  { slug: 'affiliate', name: 'Affiliate', description: 'About affiliate program' },
  { slug: 'operations', name: 'Operations', description: 'About operations process' },
  { slug: 'csr-sop', name: 'CSR SOP', description: 'About CSR standard operating procedures' },
  { slug: 'csr-knowledge', name: 'CSR Knowledgement', description: 'About CSR knowledge' },
  { slug: 'kinggroup', name: 'Kiến thức KingGroup', description: 'About KingGroup knowledge' },
  { slug: 'des-meeting', name: 'DES Meeting Minutes', description: 'About DES team meeting minutes' },
]

export const knowledgeArticles: KnowledgeArticle[] = [
  { id: '1', title: 'Workflow (Lịch làm việc, chấm công, đổi ca, nghỉ phép)', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Company workflow for scheduling, attendance, shift swap and leave.', pinned: false },
  { id: '2', title: 'TEMPLATE XIN PHÉP NHANH TRONG NGÀY', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Quick leave request template for same-day requests.', pinned: false },
  { id: '3', title: 'Template Meeting Minutes', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Standard meeting minutes template.', pinned: false },
  { id: '4', title: 'Template for Leave', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Leave request template.', pinned: false },
  { id: '5', title: 'Tiền Thưởng Giới Thiệu Nội Bộ và Phương Thức thanh toán', category: 'Company', categorySlug: 'company', author: 'KIT', excerpt: 'Internal referral bonus policy and payment method.', pinned: false },

  { id: '6', title: 'Quy chuẩn chuyên nghiệp trong văn bản, file và đặt tên', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'Professional standards for documents, files and naming.', pinned: true },
  { id: '7', title: 'Thuật ngữ chung', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'BẢNG PHÂN LOẠI THUẬT NGỮ VÀ VIẾT TẮT Phân loại Acronym English Tiếng Việt Department MKT Marketing Tiếp thị quảng cáo CS Customer Service Chăm sóc khách hàng PM Payment Tài vụ FN Finance Tài chính DL Dismissal Letter Thư […]', pinned: true },
  { id: '8', title: 'iOS Signature Q&A', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'Frequently asked questions about iOS signature.', pinned: false },
  { id: '9', title: 'Hướng dẫn quy trình di chuyển qua Campuchia', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'I. DI CHUYỂN BẰNG ĐƯỜNG BỘ (Tổng chi phí ~1.100.000 VND | Thời gian di chuyển ~6 tiếng) 1. CHECK NGÀY BAY Nhắn tin cho HR Isa để kiểm tra tình trạng hộ chiếu có thể bay theo ngày chỉ […]', pinned: false },
  { id: '10', title: 'Tổng hợp toàn bộ Thuật ngữ & Viết tắt', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'DANH SÁCH THUẬT NGỮ THEO TỪNG BỘ PHẬN 1. SEO (Search Engine Optimization) Acronym English Vietnamese Type UV Unique Visitor Người xem duy nhất SEO TUV Total Unique Visitor Tổng người xem duy nhất SEO NUV New Unique Visitor […]', pinned: false },
  { id: '11', title: 'CÁCH LẤY LẠI TIN NHẮN ĐÃ COPY KHÔNG CẦN COPY LẠI', category: 'Kiến thức chung', categorySlug: 'general', author: 'SIMON', excerpt: 'Trong trường hợp cần copy > 2 tin nhắn cùng lúc nhưng không thể hoặc quay lại sẽ lại mất tin nhắn trước đó đã paste ở cửa sổ / link khác. Đây là hướng dẫn ngắn gọn giúp bạn […]', pinned: false },
  { id: '12', title: 'Markdown Format for Mattermost (Hoặc tương tự)', category: 'Kiến thức chung', categorySlug: 'general', author: 'KIT', excerpt: 'Title (Tiêu đề) Make a heading by typing # and a space before your title. For smaller headings, use more #’s. Large Heading Smaller Heading Even Smaller Heading Renders as: Alternatively, you can underline the text using equal signs === […]', pinned: false },
  { id: '13', title: '[SOP] QUY TRÌNH CHECK VÀ REMARK KHI LINK BỊ CHẶN (DNL & Fi88)', category: 'Kiến thức chung', categorySlug: 'general', author: 'LIDAS', excerpt: 'Quy trình check và record link khi bị chặn Kiểm tra khách sử dụng mạng nào. Vào file tìm kiếm link phù hợp với mạng của khách. Sau khi khách vào được cần xin thêm những thông tin bên dưới […]', pinned: false },

  { id: '14', title: 'CMD Sports', category: 'Kiến thức Game', categorySlug: 'game', author: 'KIT', excerpt: 'CMD Sports overview.', pinned: false },
  { id: '15', title: 'Gambling Vocabulary', category: 'Kiến thức Game', categorySlug: 'game', author: 'KIT', excerpt: 'Common gambling vocabulary.', pinned: false },
  { id: '16', title: 'Baseball Betting Rules Overview', category: 'Kiến thức Game', categorySlug: 'game', author: 'KIT', excerpt: 'Baseball betting rules summary.', pinned: false },
  { id: '17', title: 'Golf Betting Rules Overview', category: 'Kiến thức Game', categorySlug: 'game', author: 'KIT', excerpt: 'Golf betting rules summary.', pinned: false },
  { id: '18', title: 'Boxing Betting Rules Overview', category: 'Kiến thức Game', categorySlug: 'game', author: 'KIT', excerpt: 'Boxing betting rules summary.', pinned: false },

  { id: '19', title: 'V8 Poker', category: 'Kiến thức Fi88', categorySlug: 'fi88', author: 'KIT', excerpt: 'V8 Poker overview.', pinned: false },
  { id: '20', title: 'Training Thể Thao', category: 'Kiến thức Fi88', categorySlug: 'fi88', author: 'KIT', excerpt: 'Sports training material.', pinned: false },
  { id: '21', title: 'BO Agent - Hướng dẫn sử dụng BO Agent (BO Đại lý)', category: 'Kiến thức Fi88', categorySlug: 'fi88', author: 'KIT', excerpt: 'BO Agent usage guide.', pinned: false },
  { id: '22', title: 'Fi88 phân biệt Hội viên trực tiếp và Hội viên đại lý', category: 'Kiến thức Fi88', categorySlug: 'fi88', author: 'KIT', excerpt: 'Difference between direct and agent members.', pinned: false },

  { id: '23', title: 'GAME OVERVIEW: Marble Magic - KingGroup', category: 'Kiến thức KingGroup', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Marble Magic game overview.', pinned: false },
  { id: '24', title: 'GAME OVERVIEW: Quả Cầu Lửa at Fun Game - KingGroup', category: 'Kiến thức KingGroup', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Fireball game overview.', pinned: false },
  { id: '25', title: 'GAME OVERVIEW: Tàu Vũ Trụ at Fun Game - KingGroup', category: 'Kiến thức KingGroup', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'Spaceship game overview.', pinned: false },
  { id: '26', title: 'CQ9 Gaming Slot Overview', category: 'Kiến thức KingGroup', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'CQ9 slot games overview.', pinned: false },
  { id: '27', title: 'KingGroup VIP Levels Overview', category: 'Kiến thức KingGroup', categorySlug: 'kinggroup', author: 'KIT', excerpt: 'VIP level structure overview.', pinned: false },

  { id: '28', title: 'DES Meeting Minutes 20250623', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
  { id: '29', title: 'DES Meeting Minutes 20250702', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
  { id: '30', title: 'DES Meeting Minutes 20250813', category: 'DES Meeting Minutes', categorySlug: 'des-meeting', author: 'KIT', excerpt: 'Design team meeting minutes.', pinned: false },
]
