import { CategoryType, CuratedCapsule, UserPreferences, MoodColor } from '../types';

export const MOOD_PRESETS = [
  { id: 'rainy_deep', label: '비 내리는 날의 사색', icon: '🌧️', defaultWeather: 'rainy' },
  { id: 'calm_rest', label: '나른한 일요일의 쉼', icon: '🛋️', defaultWeather: 'sunny' },
  { id: 'burnout_healing', label: '번아웃 뒤의 따뜻한 위로', icon: '🕯️', defaultWeather: 'dusk' },
  { id: 'midnight_nostalgia', label: '새벽 2시의 아련함', icon: '🌙', defaultWeather: 'midnight' },
  { id: 'fluttering_heart', label: '벅차오르는 설렘과 용기', icon: '✨', defaultWeather: 'sunny' },
  { id: 'bittersweet_alone', label: '쌉싸름한 고독과 성숙', icon: '🍂', defaultWeather: 'cloudy' },
  { id: 'intellectual_focus', label: '영감이 피어나는 몰입', icon: '☕', defaultWeather: 'cloudy' },
  { id: 'dreamy_escape', label: '어디론가 훌쩍 떠나고플 때', icon: '🌌', defaultWeather: 'dusk' },
];

export const CATEGORY_DEFINITIONS: { id: CategoryType; label: string; icon: string; desc: string }[] = [
  { id: 'music', label: '음악 & 플레이리스트', icon: '🎵', desc: '마음의 주파수와 공명하는 선율' },
  { id: 'books', label: '도서 & 문장의 온기', icon: '📚', desc: '밤을 건너는 한 줄의 구절' },
  { id: 'fashion', label: '패션 & 무드 OOTD', icon: '👗', desc: '오늘의 감정을 입는 스타일링' },
  { id: 'tea', label: '티 & 음료 페어링', icon: '🍵', desc: '마음을 부드럽게 감싸는 향과 온도' },
  { id: 'film', label: '시네마 & 영상미', icon: '🎬', desc: '감정의 잔상이 남는 한 편의 영화' },
  { id: 'scent', label: '향기 & 공간 인테리어', icon: '🕯️', desc: '기억을 머금은 향기와 오브제' },
];

export const MOOD_COLORS: MoodColor[] = [
  { name: '새벽 안개 블루', primaryHex: '#64748B', secondaryHex: '#334155', tailwindBg: 'from-slate-700 to-slate-900' },
  { name: '따스한 세이지 그린', primaryHex: '#84A98C', secondaryHex: '#52796F', tailwindBg: 'from-emerald-800 to-stone-900' },
  { name: '노을빛 앰버 어텀', primaryHex: '#D97706', secondaryHex: '#92400E', tailwindBg: 'from-amber-700 to-stone-900' },
  { name: '깊은 에스프레소 브라운', primaryHex: '#78593A', secondaryHex: '#453221', tailwindBg: 'from-stone-800 to-stone-950' },
  { name: '우수가 깃든 바이올렛', primaryHex: '#7C3AED', secondaryHex: '#4C1D95', tailwindBg: 'from-purple-900 to-stone-950' },
  { name: '은은한 린넨 아이보리', primaryHex: '#A8A29E', secondaryHex: '#57534E', tailwindBg: 'from-stone-600 to-stone-800' },
];

// Rich curated database for high literary & sensory quality
export const CURATION_ARCHETYPES = [
  {
    keywords: ['비', '우울', '사색', '조용', '혼자', '눈물', '센치', '생각'],
    poeticSummary: "빗방울이 유리창을 두드릴 때, 마음속 복잡한 소음은 멈추고 오롯이 내 숨소리만 남습니다.",
    emotionalPrescription: "오늘은 서둘러 밝아질 필요가 없어요. 차분하게 내리는 빗소리에 복잡한 감정을 가만히 기대어보세요.",
    moodColor: MOOD_COLORS[0],
    music: {
      trackTitle: "비 내리는 밤의 몽상 (Rainy Night Reverie)",
      artist: "루시드 폴 & 조윤성",
      album: "Silence & Raindrops",
      moodReason: "담백한 클래식 피아노와 어쿠스틱 기타의 터치가 빗소리와 어우러져 깊은 평온을 선사합니다.",
      keyLyric: "비가 그치면 우리는 조금 더 가벼운 마음으로 걸어갈 수 있을 테니.",
      vibeTag: "Acoustic Piano · Rainy Lo-Fi",
      tempo: "64 BPM · 느리고 고요한 템포",
      audioFrequency: 220,
      externalSearchQuery: "루시드 폴 비 내리는 밤",
    },
    book: {
      title: "바깥은 여름",
      author: "김애란",
      genre: "한국 단편소설",
      coverAccent: "linear-gradient(135deg, #334155, #1e293b)",
      quote: "풍경이, 계절이, 세상이 우리만 빼고 급격하게 변하고 있었다.",
      emotionalReason: "상실과 침묵을 담담하게 어루만지는 김애란 작가의 문장이 상처받은 마음의 자리를 온화하게 덥혀줍니다.",
      readingMoment: "창가에 빗방울이 맺히는 저녁, 은은한 스탠드 조명 아래에서",
    },
    fashion: {
      conceptTitle: "워시드 차콜 & 소프트 캐시미어 레이어드",
      stylingVibe: "소음으로부터 나를 감싸 안는 편안하고 포근한 실루엣",
      colorPalette: [
        { name: 'Washed Charcoal', hex: '#374151' },
        { name: 'Oatmeal Heather', hex: '#D1D5DB' },
        { name: 'Muted Slate', hex: '#64748B' },
      ],
      materials: ['헤비 울 니트', '워싱 코튼', '스웨이드'],
      topItem: "루즈핏 차콜 캐시미어 블렌드 하이넥 니트",
      bottomItem: "편안한 스트레이트 오트밀 코튼 이지 팬츠",
      outerOrAccent: "도톰한 플란넬 머플러와 빈티지 캔버스 백",
      tips: "몸을 옥죄지 않는 루즈한 실루엣으로, 촉감이 부드러운 천연 섬유 위주로 감싸주세요.",
    },
    tea: {
      blendName: "스모키 랍상소총 & 시나몬 진저 티",
      flavorNotes: ['훈연향', '스파이시 진저', '달콤한 바닐라 피니시'],
      pairingReason: "비 오는 날 특유의 서늘함을 훈연 홍차의 깊은 스모키함과 생강의 따스한 온기로 채워줍니다.",
      brewingGuide: "95℃ 온수에 4분간 천천히 우려내어 흑당 한 스푼을 곁들여보세요.",
    },
    film: {
      title: "만추 (Late Autumn)",
      director: "김태용",
      year: "2011",
      atmosphere: "안개 자욱한 시애틀, 서늘한 공기와 두 사람의 긴 침묵",
      famousLine: "당신을 알게 되어 참 좋았습니다. 그것만으로도.",
      filmReason: "말보다 시선과 호흡이 더 많은 것을 말해주는, 가을비와 안개를 닮은 서정적인 걸작입니다.",
    },
    scent: {
      name: "Petrichor & Wet Hinoki (비에 젖은 편백)",
      notes: "흙내음, 젖은 이끼(Oakmoss), 깊은 편백 우디",
      atmosphere: "비 내린 뒤 깊은 숲속의 고요한 공기감",
      diffuseTip: "방 안의 불을 끄고 편백 룸스프레이를 공중에 가볍게 분사해보세요.",
    },
  },
  {
    keywords: ['휴식', '나른', '일요일', '주말', '평화', '따뜻', '커피', '햇살'],
    poeticSummary: "오후 세 시의 비스듬한 햇살이 바닥에 길게 누울 때, 아무것도 증명하지 않아도 되는 온전한 자유를 누립니다.",
    emotionalPrescription: "오늘만큼은 생산성에 대한 강박을 내려놓으세요. 햇볕 냄새 나는 이불 속에서 게으름을 피우는 것도 훌륭한 쉼입니다.",
    moodColor: MOOD_COLORS[1],
    music: {
      trackTitle: "Sunday Afternoon Waltz",
      artist: "Bill Evans & Chet Baker",
      album: "Sunny Window Side",
      moodReason: "나른하게 흐르는 콘트라베이스와 따뜻한 피아노 타건이 일상의 긴장을 부드럽게 녹여줍니다.",
      keyLyric: "햇살이 닿는 곳마다 조용히 머무는 작은 온기들.",
      vibeTag: "Cool Jazz · Warm Acoustic",
      tempo: "78 BPM · 부드럽고 여유로운 스윙",
      audioFrequency: 293,
      externalSearchQuery: "Bill Evans Sunday Jazz",
    },
    book: {
      title: "고요할수록 밝아지는 것들",
      author: "혜민 / 박웅현 '여덟 단어'",
      genre: "인문 에세이",
      coverAccent: "linear-gradient(135deg, #52796F, #354F52)",
      quote: "바쁜 일상에서 한 걸음 물러나 마음을 가만히 바라볼 때, 우리는 비로소 진짜 내가 원하는 것을 보게 된다.",
      emotionalReason: "속도를 늦추고 주변의 소소한 아름다움을 다시 응시하게 만드는 따뜻한 시선이 담겨 있습니다.",
      readingMoment: "식후 따뜻한 차 한 잔을 곁들인 나른한 오후 2시",
    },
    fashion: {
      conceptTitle: "프렌치 린넨 & 베이지 미니멀 라운지 웨어",
      stylingVibe: "자연스러운 구김마저 멋스러운 편안한 내추럴 룩",
      colorPalette: [
        { name: 'Warm Ecru', hex: '#F5F5F0' },
        { name: 'Soft Sage', hex: '#84A98C' },
        { name: 'Toasted Sand', hex: '#D2B48C' },
      ],
      materials: ['천연 린넨', '유기농 코튼', '소프트 코듀로이'],
      topItem: "자연스러운 워싱의 오버핏 세이지 린넨 셔츠",
      bottomItem: "허리 밴딩의 와이드 에크루 코튼 트라우저",
      outerOrAccent: "가벼운 멜란지 가디건을 어깨에 살짝 둘러 연출",
      tips: "몸의 형태에 구애받지 않고 통기성이 좋은 자연 섬유로 편안함을 극대화하세요.",
    },
    tea: {
      blendName: "제주 유기농 세작 & 카모마일 릴렉스",
      flavorNotes: ['싱그러운 풀잎향', '사과 같은 은은한 단맛', '개운한 감칠맛'],
      pairingReason: "어린 녹차 잎의 단정함과 카모마일의 긴장 완화 성분이 평온한 주말의 무드를 완성합니다.",
      brewingGuide: "75℃의 부드러운 물에서 2분간 우려 맑은 연둣빛을 즐기세요.",
    },
    film: {
      title: "리틀 포레스트 (Little Forest)",
      director: "임순례",
      year: "2018",
      atmosphere: "사계절의 정취와 정갈한 제철 요리가 주는 무한한 회복력",
      famousLine: "겨울이 와야 봄이 오고, 씨앗을 뿌려야 싹이 튼다.",
      filmReason: "자연의 리듬에 맞춰 스스로를 대접하는 일의 소중함을 일깨워주는 무해한 영화입니다.",
    },
    scent: {
      name: "Sun-dried Linen & Bergamot",
      notes: "산뜻한 베르가못, 햇볕에 마른 코튼 섬유, 화이트 머스크",
      atmosphere: "갓 세탁한 린넨 커튼 사이로 불어오는 기분 좋은 바람",
      diffuseTip: "침구류 모서리에 가볍게 패브릭 미스트를 분사하세요.",
    },
  },
  {
    keywords: ['번아웃', '지침', '힘듦', '위로', '고단', '퇴근', '지쳐', '스트레스'],
    poeticSummary: "오늘 하루도 참 치열하게 견뎌내셨습니다. 이제 세상의 기대는 문밖에 두고 당신만의 안전한 쉼표로 들어오세요.",
    emotionalPrescription: "잘 해내지 못했다고 자책하지 마세요. 오늘을 무사히 살아낸 것만으로도 당신은 이미 충분히 훌륭합니다.",
    moodColor: MOOD_COLORS[2],
    music: {
      trackTitle: "숨 (Breath of Solace)",
      artist: "박효신 / 정재형",
      album: "I am A Dreamer",
      moodReason: "폐부 깊숙한 곳까지 공기가 차오르듯, 지친 영혼에 따뜻한 숨결을 불어넣어 주는 멜로디입니다.",
      keyLyric: "오늘 하루 쉴 곳을 찾지 못해 헤매던 나의 작은 마음에.",
      vibeTag: "Orchestral Ballad · Healing Instrumental",
      tempo: "60 BPM · 차분하고 웅장한 위로",
      audioFrequency: 261,
      externalSearchQuery: "박효신 숨 라이브",
    },
    book: {
      title: "어린이라는 세계",
      author: "김소민 / 김소영",
      genre: "감성 인문 에세이",
      coverAccent: "linear-gradient(135deg, #B45309, #78350F)",
      quote: "서투른 어른이 된 우리에게 필요한 것은 더 날카로운 완벽함이 아니라, 넘어졌을 때 무릎을 털어주는 관대함이다.",
      emotionalReason: "세상이 씌운 무거운 가면을 벗고 가장 순수했던 나의 내면아이를 따뜻하게 껴안아주는 책입니다.",
      readingMoment: "따뜻한 샤워를 마친 후 침대 머리맡에서",
    },
    fashion: {
      conceptTitle: "소프트 멜란지 & 코지 웜 테리 웨어",
      stylingVibe: "나를 감싸는 부드러운 담요처럼 안락하고 무해한 실루엣",
      colorPalette: [
        { name: 'Toffee Brown', hex: '#8B5A2B' },
        { name: 'Warm Cream', hex: '#FFFDD0' },
        { name: 'Muted Amber', hex: '#D97706' },
      ],
      materials: ['헤비 테리 코튼', '모달 블렌드', '플러피 울'],
      topItem: "부드러운 촉감의 웜 브라운 오버사이즈 테리 후디",
      bottomItem: "자연스러운 드레이프의 멜란지 조거 팬츠",
      outerOrAccent: "두툼한 울 삭스와 양털 슬리퍼",
      tips: "피부에 닿는 자극을 최소화하고 보온성을 높여 신체적 이완을 유도하세요.",
    },
    tea: {
      blendName: "루이보스 바닐라 & 꿀 한 스푼",
      flavorNotes: ['카페인 프리', '달콤한 바닐라빈', '부드러운 견과류 너티함'],
      pairingReason: "카페인이 전혀 없어 늦은 밤 마셔도 숙면을 돕고, 바닐라의 은은한 단향이 신경을 누그러뜨립니다.",
      brewingGuide: "끓는 물(100℃)에서 5분 이상 진하게 우린 후 꿀 한 작은술을 섞어 드세요.",
    },
    film: {
      title: "카모메 식당 (Kamome Diner)",
      director: "오기가미 나오코",
      year: "2006",
      atmosphere: "핀란드 헬싱키 골목의 작은 식당, 갓 구운 시나몬 롤과 따뜻한 오니기리",
      famousLine: "하고 싶지 않은 일은 안 할 뿐이에요.",
      filmReason: "극적인 사건 없이도 서로의 존재만으로 서서히 치유되는 사람들의 따뜻한 연대기입니다.",
    },
    scent: {
      name: "Sandalwood & Warm Vanilla Milk",
      notes: "크리미 샌달우드, 통카빈, 따스한 바닐라",
      atmosphere: "엄마 품처럼 안락하고 포근한 온기가 감도는 방",
      diffuseTip: "우드윅 캔들의 타닥거리는 장작 소리와 함께 켜두세요.",
    },
  },
  {
    keywords: ['설렘', '시작', '용기', '행복', '두근', '새로운', '도전', '사랑'],
    poeticSummary: "마음속에서 조용히 움트던 싹이 마침내 햇빛을 향해 고개를 내밉니다. 당신이 나아갈 모든 길에 축복의 바람이 불어옵니다.",
    emotionalPrescription: "이 설렘의 온도를 아낌없이 만끽하세요. 당신의 호기심과 용기는 이미 새로운 세계의 문을 열고 있습니다.",
    moodColor: MOOD_COLORS[3],
    music: {
      trackTitle: "Sparkling Morning Dew",
      artist: "Daybreak & Sam Ock",
      album: "New Beginning & Sunburst",
      moodReason: "경쾌한 브라스 세션과 청량한 기타 리프가 발걸음에 경쾌한 리듬감을 더해줍니다.",
      keyLyric: "눈부신 아침 햇살 속에 펼쳐진 우리의 새로운 이야기.",
      vibeTag: "Indie Pop · Bright Groove",
      tempo: "112 BPM · 생동감 넘치고 경쾌한 템포",
      audioFrequency: 440,
      externalSearchQuery: "Daybreak 들었다 놨다",
    },
    book: {
      title: "모든 순간이 너였다",
      author: "하태완 / 정호승 '내 인생에 힘이 되어준 한마디'",
      genre: "에세이 / 현대시",
      coverAccent: "linear-gradient(135deg, #E11D48, #BE123C)",
      quote: "너는 생각보다 훨씬 단단한 사람이고, 앞으로 마주할 찬란한 순간들이 너를 기다리고 있어.",
      emotionalReason: "새로운 출발선에 선 이에게 용기를 북돋아주고, 매 순간의 기쁨을 선명하게 각인시킵니다.",
      readingMoment: "아침 출근길 혹은 산책길 벤치에 앉아 읽는 10분",
    },
    fashion: {
      conceptTitle: "클래식 프렌치 마린 & 팝 컬러 포인트",
      stylingVibe: "청량하고 경쾌한 에너지와 지적인 세련미가 공존하는 룩",
      colorPalette: [
        { name: 'Marine Navy', hex: '#1E3A8A' },
        { name: 'Crisp White', hex: '#FFFFFF' },
        { name: 'French Red', hex: '#DC2626' },
      ],
      materials: ['고밀도 옥스퍼드 코튼', '생지 데님', '레더'],
      topItem: "깔끔한 보트넥 스트라이프 바스크 셔츠",
      bottomItem: "테이퍼드 핏의 클래식 인디고 생지 데님 팬츠",
      outerOrAccent: "레드 컬러 미니 스카프 혹은 클래식 페니 로퍼",
      tips: "단정한 스트라이프 패턴에 비비드한 컬러 액세서리로 생동감을 불어넣으세요.",
    },
    tea: {
      blendName: "시트러스 블러썸 얼그레이",
      flavorNotes: ['생기 넘치는 베르가못', '오렌지 블러썸', '자스민 플로럴'],
      pairingReason: "화사하게 터지는 꽃향과 시트러스의 상큼함이 감각을 일깨우고 기분 좋은 에너지를 배가합니다.",
      brewingGuide: "85℃에서 2분 30초간 우려 차갑게 얼음을 띄워 아이스로 즐겨도 좋습니다.",
    },
    film: {
      title: "월터의 상상은 현실이 된다 (The Secret Life of Walter Mitty)",
      director: "벤 스틸러",
      year: "2013",
      atmosphere: "아이슬란드의 광활한 도로를 스케이트보드로 질주하는 해방감",
      famousLine: "세상을 보고 무수한 장애물을 넘어 벽을 허물고 더 가까이 다가가 서로를 알아가는 것.",
      filmReason: "주저하던 발걸음을 떼게 만드는 최고의 모험이자 삶을 향한 찬가입니다.",
    },
    scent: {
      name: "Grapefruit & Orange Blossom Glow",
      notes: "과즙 가득한 핑크 그레이프프루트, 쌉쌀한 네롤리, 싱그러운 풀잎",
      atmosphere: "햇살이 쏟아지는 지중해 오렌지 농장의 상쾌한 아침",
      diffuseTip: "외출 전 손목과 옷깃에 가볍게 롤온 오일을 터치하세요.",
    },
  },
  {
    keywords: ['새벽', '밤', '고독', '아련', '추억', '그리움', '달', '기억'],
    poeticSummary: "모두가 잠든 시간, 어둠은 차분한 이불이 되어 낮 동안 숨겨두었던 마음의 진실들을 다정하게 비춰줍니다.",
    emotionalPrescription: "이 새벽의 적막을 두려워하지 마세요. 오롯이 나 자신과 대화할 수 있는 가장 정직하고 아름다운 시간입니다.",
    moodColor: MOOD_COLORS[4],
    music: {
      trackTitle: "Midnight Blue & Echoes",
      artist: "Yiruma & Olafur Arnalds",
      album: "Night Library Sessions",
      moodReason: "아름다운 네오 클래시컬 선율과 앰비언트 사운드가 심야의 고요함을 품격 있게 채워줍니다.",
      keyLyric: "별빛이 스러져가는 밤하늘에 띄워 보내는 나직한 안녕.",
      vibeTag: "Neo-Classical · Ambient Drone",
      tempo: "56 BPM · 심연처럼 깊고 아련한 템포",
      audioFrequency: 196,
      externalSearchQuery: "Olafur Arnalds piano live",
    },
    book: {
      title: "달과 6펜스",
      author: "서머싯 몸 / 황경신 '밤 열한 시'",
      genre: "문학 / 감성 산문집",
      coverAccent: "linear-gradient(135deg, #1E1B4B, #0F172A)",
      quote: "우리가 밤에 깨어 있는 이유는 잠이 오지 않아서가 아니라, 지나간 어떤 밤을 아직 떠나보내지 못했기 때문이다.",
      emotionalReason: "밤이라는 특별한 시공간에서만 허락되는 솔직한 감정의 결을 섬세하게 짚어냅니다.",
      readingMoment: "새벽 1시, 은은한 간접 조명만 켜둔 침실에서",
    },
    fashion: {
      conceptTitle: "미드나잇 네이비 & 딥 인디고 실크 터치",
      stylingVibe: "밤의 깊이를 닮은 차분하고 지적인 다크 무드 룩",
      colorPalette: [
        { name: 'Midnight Navy', hex: '#0F172A' },
        { name: 'Smoky Charcoal', hex: '#1F2937' },
        { name: 'Muted Silver', hex: '#94A3B8' },
      ],
      materials: ['실크 코튼', '모헤어 니트', '부드러운 울 트윌'],
      topItem: "깊은 네이비 톤의 가벼운 모헤어 라운드 니트",
      bottomItem: "흐르는 듯한 실루엣의 차콜 와이드 슬랙스",
      outerOrAccent: "빈티지 실버 링과 가느다란 가죽 스트랩 워치",
      tips: "어두운 톤 속에서 소재의 질감 대비를 통해 깊이감을 더하세요.",
    },
    tea: {
      blendName: "라벤더 슬립 웰 블렌딩 티",
      flavorNotes: ['프렌치 라벤더', '레몬밤', '감초의 은은한 여운'],
      pairingReason: "밤의 긴장된 신경계를 차분하게 진정시키고 깊고 평화로운 수면으로 이끌어줍니다.",
      brewingGuide: "90℃에서 4분간 뚜껑을 덮고 향이 날아가지 않게 우려내세요.",
    },
    film: {
      title: "그녀 (Her)",
      director: "스파이크 존즈",
      year: "2013",
      atmosphere: "파스텔톤 도시의 야경과 고독한 사람들의 섬세한 온기",
      famousLine: "과거는 그저 우리가 스스로에게 들려주는 이야기일 뿐이야.",
      filmReason: "현대인의 고독과 진정한 교감에 대한 질문을 가장 감각적인 영상미로 풀어낸 수작입니다.",
    },
    scent: {
      name: "Midnight Incense & Cedar Fog",
      notes: "절간의 고즈넉한 인센스, 시더우드, 앰버, 페티그레인",
      atmosphere: "고요한 사찰이나 심야 서재의 깊고 성찰적인 공기",
      diffuseTip: "작은 향꽂이에 인센스 스틱 하나를 켜고 잔향을 음미하세요.",
    },
  },
];

// Helper to find best matching archetype
export function matchCuratedArchetype(thought: string, moodVibe?: string): typeof CURATION_ARCHETYPES[0] {
  const combined = `${thought} ${moodVibe || ''}`.toLowerCase();
  
  for (const item of CURATION_ARCHETYPES) {
    for (const kw of item.keywords) {
      if (combined.includes(kw)) {
        return item;
      }
    }
  }

  // Preset match
  if (moodVibe) {
    if (moodVibe.includes('rain') || moodVibe.includes('사색')) return CURATION_ARCHETYPES[0];
    if (moodVibe.includes('rest') || moodVibe.includes('쉼') || moodVibe.includes('일요일')) return CURATION_ARCHETYPES[1];
    if (moodVibe.includes('burnout') || moodVibe.includes('위로') || moodVibe.includes('지침')) return CURATION_ARCHETYPES[2];
    if (moodVibe.includes('flutter') || moodVibe.includes('설렘') || moodVibe.includes('시작')) return CURATION_ARCHETYPES[3];
    if (moodVibe.includes('midnight') || moodVibe.includes('새벽') || moodVibe.includes('아련')) return CURATION_ARCHETYPES[4];
  }

  return CURATION_ARCHETYPES[0]; // fallback default
}

// Generate tailored capsule with user preferences considered
export function generateOfflineCapsule(
  thought: string,
  moodVibe: string,
  weather: string,
  categories: CategoryType[],
  preferences: UserPreferences
): CuratedCapsule {
  const base = matchCuratedArchetype(thought, moodVibe);
  const now = new Date();
  const dateStr = now.toLocaleDateString('ko-KR', {
    month: 'long',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  const capsule: CuratedCapsule = {
    id: 'capsule_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    createdAt: dateStr,
    author: {
      id: 'me',
      name: preferences.nickname || '익명의 취향자',
      avatar: preferences.avatar || '🌿',
      tasteTag: preferences.vibeKeywords?.[0] || '감성 아키비스트',
    },
    inputThought: thought || '말없이 마음의 여운을 가만히 응시하는 시간',
    moodVibe: moodVibe || '잔잔한 사색',
    weather: weather || 'cloudy',
    poeticSummary: base.poeticSummary,
    emotionalPrescription: base.emotionalPrescription,
    moodColor: base.moodColor,
    activeCategories: categories,
    isPublic: true,
    likes: 0,
    likedByMe: false,
    savedByMe: false,
    comments: [],
    tags: [moodVibe || '오늘의무드', weather || '감성날씨', ...(preferences.vibeKeywords || ['취향기록'])],
  };

  if (categories.includes('music')) {
    capsule.music = {
      ...base.music,
      // If user has specific music genre preference, weave it gently
      vibeTag: preferences.musicGenres?.[0] ? `${preferences.musicGenres[0]} · ${base.music.vibeTag}` : base.music.vibeTag,
    };
  }

  if (categories.includes('books')) {
    capsule.book = {
      ...base.book,
      genre: preferences.bookGenres?.[0] ? `${preferences.bookGenres[0]} / ${base.book.genre}` : base.book.genre,
    };
  }

  if (categories.includes('fashion')) {
    capsule.fashion = {
      ...base.fashion,
      conceptTitle: preferences.fashionStyles?.[0] ? `${preferences.fashionStyles[0]} 무드 · ${base.fashion.conceptTitle}` : base.fashion.conceptTitle,
    };
  }

  if (categories.includes('tea')) {
    capsule.tea = base.tea;
  }

  if (categories.includes('film')) {
    capsule.film = base.film;
  }

  if (categories.includes('scent')) {
    capsule.scent = base.scent;
  }

  return capsule;
}
