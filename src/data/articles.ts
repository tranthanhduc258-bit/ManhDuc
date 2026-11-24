/**
 * BÀI VIẾT – KIẾN THỨC LỢI KHUẨN
 * Mỗi bài gồm các khối nội dung: "p" (đoạn văn), "h2" (tiêu đề nhỏ), "ul" (danh sách).
 * Lưu ý pháp lý: không viết sản phẩm có tác dụng chữa bệnh, điều trị, thay thế thuốc.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  tag: string;
  content: Block[];
};

export const articles: Article[] = [
  {
    slug: "loi-khuan-la-gi",
    title: "Lợi khuẩn là gì?",
    excerpt:
      "Lợi khuẩn là những vi sinh vật có ích sống trong cơ thể và trong nhiều thực phẩm lên men. Cùng tìm hiểu chúng là gì và có trong những món ăn nào.",
    date: "2026-11-20",
    readMinutes: 3,
    tag: "Kiến thức cơ bản",
    content: [
      {
        type: "p",
        text: "Nhắc đến vi khuẩn, nhiều người nghĩ ngay đến bệnh tật. Thực tế, cơ thể chúng ta là “ngôi nhà” của hàng nghìn tỷ vi sinh vật, và rất nhiều trong số đó sống hòa bình, thậm chí có ích. Những vi sinh vật có ích này thường được gọi chung là lợi khuẩn.",
      },
      { type: "h2", text: "Lợi khuẩn sống ở đâu?" },
      {
        type: "p",
        text: "Phần lớn lợi khuẩn cư trú trong đường ruột. Chúng cùng với nhiều loại vi sinh vật khác tạo nên hệ vi sinh đường ruột – một hệ sinh thái nhỏ luôn thay đổi theo chế độ ăn uống, giấc ngủ, mức độ vận động và lối sống của mỗi người.",
      },
      {
        type: "p",
        text: "Một số nhóm lợi khuẩn quen thuộc là Lactobacillus và Bifidobacterium. Đây cũng là những cái tên thường gặp trên nhãn của sữa chua, sữa chua uống và các thực phẩm lên men.",
      },
      { type: "h2", text: "Lợi khuẩn có trong thực phẩm nào?" },
      {
        type: "p",
        text: "Từ xa xưa, con người đã biết dùng quá trình lên men để làm thực phẩm ngon hơn và để được lâu hơn. Nhiều món ăn lên men chứa lợi khuẩn hoặc được tạo ra nhờ lợi khuẩn, ví dụ:",
      },
      {
        type: "ul",
        items: [
          "Sữa chua ăn và sữa chua uống lên men",
          "Dưa muối, cà muối, kim chi",
          "Một số loại phô mai lên men tự nhiên",
          "Tương, miso và các loại đậu lên men",
        ],
      },
      { type: "h2", text: "Bổ sung lợi khuẩn hằng ngày thế nào cho hợp lý?" },
      {
        type: "p",
        text: "Cách đơn giản nhất là đưa thực phẩm lên men vào thực đơn một cách đều đặn, với lượng vừa phải. Một chai sữa chua uống nhỏ sau bữa ăn, một hũ sữa chua buổi chiều hay vài miếng dưa muối trong bữa cơm đều là những lựa chọn dễ thực hiện.",
      },
      {
        type: "p",
        text: "Bên cạnh đó, lợi khuẩn cũng cần “thức ăn” để phát triển. Chất xơ từ rau xanh, trái cây, ngũ cốc nguyên hạt và các loại đậu góp phần nuôi dưỡng hệ vi sinh. Uống đủ nước, ngủ đủ giấc và vận động thường xuyên cũng là những thói quen tốt cho cơ thể nói chung.",
      },
      { type: "h2", text: "Những điều cần nhớ" },
      {
        type: "ul",
        items: [
          "Lợi khuẩn là vi sinh vật có ích, có trong cơ thể và nhiều thực phẩm lên men.",
          "Thực phẩm bổ sung lợi khuẩn là thực phẩm, không phải là thuốc và không thay thế thuốc chữa bệnh.",
          "Nên ăn uống đa dạng, cân bằng; người có vấn đề sức khỏe nên hỏi ý kiến bác sĩ hoặc chuyên gia dinh dưỡng.",
        ],
      },
      {
        type: "p",
        text: "Hiểu đúng về lợi khuẩn giúp chúng ta chọn thực phẩm phù hợp hơn cho gia đình. Một ly sữa chua uống mát lạnh mỗi ngày vừa thơm ngon, vừa là cách nhẹ nhàng để đưa thực phẩm lên men vào thực đơn.",
      },
    ],
  },
  {
    slug: "sua-chua-uong-len-men-khac-sua-thuong",
    title: "Sữa chua uống lên men khác sữa thường thế nào?",
    excerpt:
      "Cùng xuất phát từ sữa, nhưng sữa chua uống lên men có hương vị, kết cấu và cách bảo quản khác hẳn sữa tươi. Đâu là điểm khác biệt chính?",
    date: "2026-11-18",
    readMinutes: 3,
    tag: "So sánh",
    content: [
      {
        type: "p",
        text: "Đứng trước kệ hàng, nhiều người băn khoăn: sữa chua uống và sữa tươi đều làm từ sữa, vậy khác nhau ở điểm nào? Câu trả lời nằm ở một bước rất quan trọng – quá trình lên men.",
      },
      { type: "h2", text: "Lên men là gì?" },
      {
        type: "p",
        text: "Lên men là quá trình các vi khuẩn có ích, thường là vi khuẩn lactic, “ăn” một phần đường lactose tự nhiên trong sữa và tạo ra axit lactic. Axit này làm sữa chua lại, đặc hơn và mang hương vị đặc trưng. Sữa tươi thông thường không trải qua bước này, nên vẫn giữ vị béo ngọt nguyên bản.",
      },
      { type: "h2", text: "Những điểm khác biệt chính" },
      {
        type: "ul",
        items: [
          "Hương vị: sữa chua uống có vị chua ngọt hài hòa, thanh mát; sữa tươi có vị béo, ngọt dịu.",
          "Kết cấu: sữa chua uống thường sánh nhẹ, dễ uống; sữa tươi lỏng hơn.",
          "Vi sinh vật: sữa chua uống lên men có sự tham gia của vi khuẩn lactic; sữa tươi tiệt trùng gần như không còn vi sinh vật.",
          "Đường lactose: một phần lactose đã được chuyển hóa trong quá trình lên men, vì vậy nhiều người cảm thấy sữa chua uống “nhẹ bụng” hơn – tuy nhiên cảm nhận này khác nhau ở mỗi người.",
        ],
      },
      { type: "h2", text: "Vì sao thời gian lên men lại quan trọng?" },
      {
        type: "p",
        text: "Thời gian và nhiệt độ lên men ảnh hưởng trực tiếp đến hương vị và độ sánh của sản phẩm. Lên men chậm và đủ lâu giúp hương vị tròn hơn, vị chua dịu hơn, không gắt. Sữa chua uống Chun Yi Tian được lên men trong 72 giờ, cho vị chua ngọt cân bằng và hậu vị thanh mát.",
      },
      { type: "h2", text: "Nên chọn loại nào?" },
      {
        type: "p",
        text: "Sữa tươi và sữa chua uống không thay thế nhau mà bổ sung cho nhau. Sữa tươi là lựa chọn quen thuộc cho bữa sáng; sữa chua uống phù hợp sau bữa ăn, làm món ăn vặt cho trẻ hay mang theo khi đi học, đi làm. Điều quan trọng là ăn uống đa dạng và chọn sản phẩm có nguồn gốc rõ ràng, nhãn mác đầy đủ.",
      },
      {
        type: "p",
        text: "Khi chọn mua sữa chua uống, hãy để ý hạn sử dụng, hướng dẫn bảo quản và tình trạng bao bì. Sản phẩm còn nguyên vẹn, được bảo quản đúng cách sẽ giữ được hương vị thơm ngon nhất.",
      },
    ],
  },
  {
    slug: "cach-bao-quan-sua-chua-uong",
    title: "Cách bảo quản sữa chua uống đúng cách",
    excerpt:
      "Bảo quản đúng giúp sữa chua uống giữ trọn hương vị. Vài lưu ý đơn giản khi mua về, khi cất trữ và khi mang đi.",
    date: "2026-11-15",
    readMinutes: 3,
    tag: "Mẹo hay",
    content: [
      {
        type: "p",
        text: "Sữa chua uống là thực phẩm lên men, vì vậy cách bảo quản ảnh hưởng nhiều đến hương vị. Chỉ với vài thói quen nhỏ, bạn có thể giữ cho từng chai sữa luôn thơm ngon như lúc mới mua.",
      },
      { type: "h2", text: "1. Luôn đọc hướng dẫn trên bao bì" },
      {
        type: "p",
        text: "Mỗi sản phẩm có điều kiện bảo quản riêng, được nhà sản xuất in trên nhãn. Có loại cần giữ lạnh liên tục, có loại bảo quản được ở nhiệt độ thường khi chưa mở. Hãy ưu tiên làm theo hướng dẫn in trên bao bì và để ý hạn sử dụng.",
      },
      { type: "h2", text: "2. Khi mua về" },
      {
        type: "ul",
        items: [
          "Kiểm tra bao bì: nắp kín, chai không phồng, không móp méo hay rò rỉ.",
          "Sắp xếp theo nguyên tắc “hạn gần dùng trước”.",
          "Để nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp và nguồn nhiệt như bếp, cốp xe.",
          "Muốn uống ngon hơn, cho vào ngăn mát tủ lạnh trước khi dùng vài giờ.",
        ],
      },
      { type: "h2", text: "3. Khi đã mở nắp" },
      {
        type: "p",
        text: "Chai 108ml vừa đủ cho một lần uống, vì vậy tốt nhất nên uống hết ngay sau khi mở. Nếu chưa dùng hết, đậy kín và cất ngăn mát, dùng trong thời gian ngắn. Không nên để chai đã mở ở nhiệt độ phòng quá lâu.",
      },
      { type: "h2", text: "4. Khi mang đi học, đi làm" },
      {
        type: "p",
        text: "Trong những ngày nắng nóng, bạn có thể cho sữa vào túi giữ nhiệt kèm đá khô hoặc túi đá gel. Tránh để sữa trong ô tô đỗ ngoài trời hoặc ba lô dưới nắng lâu.",
      },
      { type: "h2", text: "5. Những điều không nên làm" },
      {
        type: "ul",
        items: [
          "Không để sữa ở ngăn đá: sữa có thể bị tách lớp và thay đổi hương vị.",
          "Không đun nóng sữa chua uống, vì nhiệt độ cao làm mất đi đặc trưng của sản phẩm lên men.",
          "Không dùng sản phẩm đã quá hạn, chai phồng hoặc có mùi vị lạ.",
        ],
      },
      { type: "h2", text: "Mẹo nhỏ" },
      {
        type: "p",
        text: "Lắc nhẹ chai trước khi uống để sữa đều và mịn hơn. Với khay 20 chai hay thùng 80 chai, bạn có thể để phần lớn ở nơi thoáng mát và chỉ cho vào tủ lạnh lượng đủ dùng trong vài ngày – vừa tiết kiệm chỗ, vừa luôn có sữa mát để uống.",
      },
      {
        type: "p",
        text: "Bảo quản đúng cách là cách đơn giản nhất để mỗi chai sữa chua uống luôn giữ được vị chua ngọt dịu và cảm giác mát lành mỗi ngày.",
      },
    ],
  },
];

export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
