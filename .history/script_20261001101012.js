function appData() {
  return {
    activeTab: 'config',
    config: {
      subject: 'Toán học',
      grade: 'Lớp 12',
      duration: 90,
      school: 'TRƯỜNG THPT CHUẨN CV 7991',
      academicYear: '2025 - 2026',
      targetQuestions: 40,
      points: { mcq: 0.25, tf: 1.0, sa: 0.5 }
    },
    topics: [],

    init() {
      this.loadSampleData();
    },

    loadSampleData() {
      this.topics = [
        {
          id: Date.now() + 1,
          name: 'Chủ đề 1: Ứng dụng đạo hàm để khảo sát hàm số',
          units: [
            {
              id: Date.now() + 2,
              name: 'Bài 1. Tính đơn điệu và cực trị của hàm số',
              mcq: { b: 4, h: 2, vd: 0 },
              tf: { b: 1, h: 1, vd: 0 },
              sa: { b: 0, h: 2, vd: 0 },
              essay: { b: 0, h: 0, vd: 1.0 },
              spec: {
                b: 'Nhận biết được tính đơn điệu, điểm cực trị của hàm số thông qua bảng biến thiên hoặc đồ thị.',
                h: 'Thông hiểu các bước tìm khoảng đơn điệu và cực trị của hàm số cho bởi công thức.',
                vd: 'Vận dụng được đạo hàm để giải quyết bài toán thực tế đơn giản.'
              }
            }
          ]
        }
      ];
    },

    applySpecTemplate(unit, level) {
      const templates = {
        b: `Nhận biết và nêu được các khái niệm, định lý, tính chất cơ bản thuộc ${unit.name}.`,
        h: `Giải thích, diễn giải và thực hiện được các phép tính, biến đổi cơ bản liên quan đến ${unit.name}.`,
        vd: `Vận dụng linh hoạt các kiến thức của ${unit.name} để giải quyết bài toán thực tiễn hoặc bài toán tổng hợp.`
      };
      unit.spec[level] = unit.spec[level] ? `${unit.spec[level]}\n- ${templates[level]}` : templates[level];
    },

    addTopic() {
      this.topics.push({ id: Date.now(), name: 'Chủ đề mới', units: [] });
    },
    removeTopic(index) {
      this.topics.splice(index, 1);
    },
    addUnit(topicIndex) {
      this.topics[topicIndex].units.push({
        id: Date.now(),
        name: 'Đơn vị kiến thức mới',
        mcq: { b: 0, h: 0, vd: 0 },
        tf: { b: 0, h: 0, vd: 0 },
        sa: { b: 0, h: 0, vd: 0 },
        essay: { b: 0, h: 0, vd: 0 },
        spec: { b: '', h: '', vd: '' }
      });
    },
    removeUnit(topicIndex, unitIndex) {
      this.topics[topicIndex].units.splice(unitIndex, 1);
    },

    calculateUnitScore(unit) {
      let score = 0;
      score += ((unit.mcq.b || 0) + (unit.mcq.h || 0) + (unit.mcq.vd || 0)) * (this.config.points.mcq || 0);
      score += ((unit.tf.b || 0) + (unit.tf.h || 0) + (unit.tf.vd || 0)) * (this.config.points.tf || 0);
      score += ((unit.sa.b || 0) + (unit.sa.h || 0) + (unit.sa.vd || 0)) * (this.config.points.sa || 0);
      score += (Number(unit.essay.b) || 0) + (Number(unit.essay.h) || 0) + (Number(unit.essay.vd) || 0);
      return score;
    },

    get totals() {
      let res = {
        mcq: { b: 0, pointB: 0, h: 0, pointH: 0, vd: 0, pointVD: 0, proportion: 0 },
        tf: { b: 0, pointB: 0, h: 0, pointH: 0, vd: 0, pointVD: 0, proportion: 0 },
        sa: { b: 0, pointB: 0, h: 0, pointH: 0, vd: 0, pointVD: 0, proportion: 0 },
        essay: { b: 0, pointB: 0, h: 0, pointH: 0, vd: 0, pointVD: 0, proportion: 0 },
        totalScore: 0,
        totalQuestions: 0
      };

      this.topics.forEach(t => {
        t.units.forEach(u => {
          res.mcq.b += Number(u.mcq.b) || 0;
          res.mcq.pointB += Number(u.mcq.b * (this.config.points.mcq || 0)) || 0;
          res.mcq.h += Number(u.mcq.h) || 0;
          res.mcq.pointH += Number(u.mcq.h * (this.config.points.mcq || 0)) || 0;
          res.mcq.vd += Number(u.mcq.vd) || 0;
          res.mcq.pointVD += Number(u.mcq.vd * (this.config.points.mcq || 0)) || 0;
          res.mcq.proportion = (res.mcq.pointB + res.mcq.pointH + res.mcq.pointVD) / (res.totalScore || 1) * 100%;

          res.tf.b += Number(u.tf.b) || 0;
          res.tf.pointB += Number(u.tf.b * (this.config.points.tf || 0)) || 0;
          res.tf.h += Number(u.tf.h) || 0;
          res.tf.pointH += Number(u.tf.h * (this.config.points.tf || 0)) || 0;
          res.tf.vd += Number(u.tf.vd) || 0;
          res.tf.pointVD += Number(u.tf.vd * (this.config.points.tf || 0)) || 0;
          res.tf.proportion = (res.tf.pointB + res.tf.pointH + res.tf.pointVD) / (res.totalScore || 1);
          
          res.sa.b += Number(u.sa.b) || 0;
          res.sa.pointB += Number(u.sa.b * (this.config.points.sa || 0)) || 0;
          res.sa.h += Number(u.sa.h) || 0;
          res.sa.pointH += Number(u.sa.h * (this.config.points.sa || 0)) || 0;
          res.sa.vd += Number(u.sa.vd) || 0;
          res.sa.pointVD += Number(u.sa.vd * (this.config.points.sa || 0)) || 0;
          res.sa.proportion = (res.sa.pointB + res.sa.pointH + res.sa.pointVD) / (res.totalScore || 1);

          res.essay.b += Number(u.essay.b) || 0;
          res.essay.pointB += Number(u.essay.b * (this.config.points.essay || 1)) || 0;
          res.essay.h += Number(u.essay.h) || 0;
          res.essay.pointH += Number(u.essay.h * (this.config.points.essay || 1)) || 0;
          res.essay.vd += Number(u.essay.vd) || 0;
          res.essay.pointVD += Number(u.essay.vd * (this.config.points.essay || 1)) || 0;
          res.essay.proportion = (res.essay.pointB + res.essay.pointH + res.essay.pointVD) / (res.totalScore || 1);

          res.totalScore += this.calculateUnitScore(u);
        });
      });

      const mcqCount = res.mcq.b + res.mcq.h + res.mcq.vd;
      const tfCount = res.tf.b + res.tf.h + res.tf.vd;
      const saCount = res.sa.b + res.sa.h + res.sa.vd;
      const essayCount = (res.essay.b > 0 ? 1 : 0) + (res.essay.h > 0 ? 1 : 0) + (res.essay.vd > 0 ? 1 : 0);

      res.totalQuestions = mcqCount + tfCount + saCount + essayCount;
      return res;
    },

    exportJSON() {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ config: this.config, topics: this.topics }, null, 2));
      const anchor = document.createElement('a');
      anchor.setAttribute("href", dataStr);
      anchor.setAttribute("download", `MaTran_CV7991_${this.config.subject}.json`);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
    },

    importJSON(event) {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target.result);
          if (parsed.config && parsed.topics) {
            this.config = parsed.config;
            this.topics = parsed.topics;
            alert('Nhập dữ liệu thành công!');
          }
        } catch (err) {
          alert('File JSON không hợp lệ!');
        }
      };
      reader.readAsText(file);
    },

    printDoc() { 
      window.print(); 
    },

    exportWord() {
      const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><style>body { font-family: 'Times New Roman', serif; } table { border-collapse: collapse; width: 100%; } table, th, td { border: 1px solid black; padding: 4px; text-align: center; font-size: 10pt; } .text-left { text-align: left; }</style></head><body>";
      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + document.getElementById("print-area").innerHTML + "</body></html>");
      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = `Ma_Tran_Dac_Ta_${this.config.subject}.doc`;
      fileDownload.click();
      document.body.removeChild(fileDownload);
    },

    exportExamTemplate() {
      const t = this.totals;
      const totalMCQ = t.mcq.b + t.mcq.h + t.mcq.vd;
      const totalTF = t.tf.b + t.tf.h + t.tf.vd;
      const totalSA = t.sa.b + t.sa.h + t.sa.vd;
      
      let docHTML = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><style>
          body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.3; }
          .header { width: 100%; margin-bottom: 15px; }
          .header td { border: none; text-align: center; vertical-align: top; }
          .section-title { font-weight: bold; margin-top: 15px; margin-bottom: 5px; }
          .question { margin-bottom: 10px; }
          .options { margin-left: 20px; }
        </style></head>
        <body>
          <table class="header">
            <tr>
              <td width="40%"><b>${this.config.school.toUpperCase()}</b><br><b>ĐỀ THI THAM KHẢO</b></td>
              <td width="60%"><b>ĐỀ KIỂM TRA MÔN ${this.config.subject.toUpperCase()} - ${this.config.grade.toUpperCase()}</b><br>Năm học: ${this.config.academicYear}<br><i>Thời gian làm bài: ${this.config.duration} phút</i></td>
            </tr>
          </table>
          <hr>
      `;

      if (totalMCQ > 0) {
        docHTML += `<div class="section-title">PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn. (Thí sinh trả lời từ câu 1 đến câu ${totalMCQ})</div>`;
        for (let i = 1; i <= totalMCQ; i++) {
          docHTML += `
            <div class="question"><b>Câu ${i}:</b> [Nội dung câu hỏi nhiều lựa chọn ${i}]</div>
            <div class="options">A. Đáp án A &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; B. Đáp án B &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; C. Đáp án C &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D. Đáp án D</div><br>
          `;
        }
      }

      if (totalTF > 0) {
        docHTML += `<div class="section-title">PHẦN II. Câu trắc nghiệm đúng sai / Yes-No. (Thí sinh trả lời từ câu 1 đến câu ${totalTF})</div>`;
        for (let i = 1; i <= totalTF; i++) {
          docHTML += `
            <div class="question"><b>Câu ${i}:</b> Trong mỗi ý a), b), c), d) ở câu này, thí sinh chọn Đúng hoặc Sai (Yes/No).<br>
            a) Mệnh đề / Ý hỏi 1...<br>
            b) Mệnh đề / Ý hỏi 2...<br>
            c) Mệnh đề / Ý hỏi 3...<br>
            d) Mệnh đề / Ý hỏi 4...</div><br>
          `;
        }
      }

      if (totalSA > 0) {
        docHTML += `<div class="section-title">PHẦN III. Câu trắc nghiệm trả lời ngắn. (Thí sinh trả lời từ câu 1 đến câu ${totalSA})</div>`;
        for (let i = 1; i <= totalSA; i++) {
          docHTML += `<div class="question"><b>Câu ${i}:</b> [Nội dung câu hỏi trả lời ngắn ${i}]<br><i>Đáp số:</i> ....................</div><br>`;
        }
      }

      const totalEssayPoints = t.essay.b + t.essay.h + t.essay.vd;
      if (totalEssayPoints > 0) {
        docHTML += `<div class="section-title">PHẦN IV. Tự luận (${totalEssayPoints} điểm)</div>`;
        docHTML += `<div class="question"><b>Câu 1 (${totalEssayPoints} điểm):</b> [Nội dung câu hỏi tự luận]</div>`;
      }

      docHTML += `</body></html>`;

      const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(docHTML);
      const fileDownload = document.createElement("a");
      document.body.appendChild(fileDownload);
      fileDownload.href = source;
      fileDownload.download = `Khung_De_Thi_${this.config.targetQuestions}Cau_${this.config.subject}.doc`;
      fileDownload.click();
      document.body.removeChild(fileDownload);
    }
  };
}