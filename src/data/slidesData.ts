import { SlideData } from '../types/slides';

export const SLIDES_DATA: SlideData[] = [
  {
    id: 1,
    sectionId: "0",
    sectionName: "COURSE INTRODUCTION",
    title: "Lecturer Name: A. Rahman",
    thread: "python",
    layout: "vscode-macbook",
    visualData: {
      lecturerName: "A. Rahman"
    },
    speakerNotes: {
      timing: "0:00 - 0:50",
      hook: "Sapaan pembuka dan perkenalan dosen / Welcome & lecturer introduction.",
      speakingPoints: [
        "🇮🇩 ID: Selamat pagi all of my students, apa kabar semuanya? Di hari pertama kelas kita ini, saya sangat senang dapat berjumpa dan berbagi bersama kalian. Orang bilang tidak kenal maka tidak sayang, jadi sebaiknya kenalan dulu. Nama saya A. Rahman, saat ini sedang menempuh studi S3, dan sangat antusias mengeksplorasi Python for AI bersama kalian semua. Mari kita mulai!",
        "🇬🇧 EN (Level B1): Good morning everyone, how is everybody doing today? On this very special day, our first day of class, I would like to say that I am really glad to meet you all and share this journey with you. I hope you will enjoy this class. As people often say: 'You can't love what you don't know', so let's introduce ourselves first. My name is A. Rahman, I am currently pursuing my PhD degree, and I am very excited to explore Python for AI together with all of you. Are you ready? Let's get started!"
      ],
      pedagogicalTip: "Smile warmly, keep your speaking pace steady and natural, making eye contact with the camera/students."
    }
  },
  // SECTION 1 — From Human Language to Machine Language (Slides 1 to 6)
  {
    id: 2,
    sectionId: '1',
    sectionName: 'SECTION 1 — From Human Language to Machine Language',
    title: 'Does anyone already know what programming is?',
    thread: 'python',
    layout: 'hook-question',
    speakerNotes: {
      timing: "0:45 - 1:45",
      hook: "Pertanyaan pemantik interaktif / Interactive hook question.",
      speakingPoints: [
        "🇮🇩 ID: Baik, mungkin saya akan buka perkuliahan kita dengan satu pertanyaan santai ini: coba angkat tangan bagi yang sudah tahu, sebenarnya programming itu apa sih? (Beri jeda 3-5 detik, persilakan mahasiswa menjawab). Menarik sekali! Ada yang bilang membuat aplikasi, menulis kode, atau memberi instruksi ke komputer. Apapun jawaban kalian, jika sudah pernah mencoba itu keren, dan jika belum pernah sama sekali menyentuh kode, kalian berada di tempat yang sangat tepat. Mari kita kupas tuntas!",
        "🇬🇧 EN (Level B1): Alright, maybe I will start our lecture with this simple question: please raise your hand if you already know, what is programming, actually? (Pause for 3-5 seconds, listen to student answers). Very interesting! Some of you say it is writing code, making applications, or giving instructions to a computer. Whatever your answer is, if you already know, that is great! And if you have never written a line of code before, don't worry, you are in the exact right place. Let's explore it together!"
      ],
      pedagogicalTip: "Pause 3-5 seconds after asking the question. Acknowledge and appreciate student responses to build a collaborative classroom atmosphere."
    }
  },
  {
    id: 3,
    sectionId: '1',
    sectionName: 'SECTION 1 — From Human Language to Machine Language',
    title: 'How do we communicate?',
    caption: 'Humans understand each other through language. How does a machine understand us?',
    thread: 'python',
    layout: 'split-visual',
    visualData: {
      humanLanguages: [
        { lang: 'English', flag: '🇬🇧', phrase: 'Hello, how are you?' },
        { lang: 'Polish', flag: '🇵🇱', phrase: 'Cześć, jak się masz?' },
        { lang: 'Turkish', flag: '🇹🇷', phrase: 'Merhaba, nasılsın?' },
        { lang: 'Indonesian', flag: '🇮🇩', phrase: 'Halo, apa kabar?' },
        { lang: 'Japanese', flag: '🇯🇵', phrase: 'こんにちは (Konnichiwa)' },
      ],
      machineSide: {
        signals: '01001000 01101001 00100001',
        voltage: 'High / Low Voltage Transistors',
        dilemma: 'Computers do not speak English or Polish. They only count microscopic electric pulses.'
      }
    },
    speakerNotes: {
      timing: "1:45 - 3:30",
      hook: "Analogi bahasa manusia vs bahasa komputer / Human vs machine communication analogy.",
      speakingPoints: [
        "🇮🇩 ID: Kamu benar, dan ini tambahan dari saya: bahasa pemrograman itu pada dasarnya sama seperti kita manusia yang memiliki berbagai bahasa. Di negara saya, Indonesia, ada lebih dari 700 bahasa daerah, belum lagi ribuan bahasa di seluruh dunia. Semua itu kita pakai untuk saling mengenal, berkomunikasi, bertukar pikiran, dan mengungkapkan perasaan. Nah, ternyata bukan cuma manusia yang berkomunikasi; benda mati seperti besi, plastik, dan silikon yang kita sebut komputer pun punya bahasa mereka sendiri. Komputer hanya mengenal pulsa listrik 1 dan 0. Para ilmuwan menciptakan jembatan agar manusia dan komputer bisa saling memahami.",
        "🇬🇧 EN (Level B1): You are totally right, and here is an addition from me: programming languages are actually just like human languages. In my home country, Indonesia, we have more than 700 local languages, not to mention thousands of languages across the globe! We use them to connect, share opinions, and express feelings. Interestingly, humans are not the only ones who communicate. Even physical machines made of metal, plastic, and silicon—what we call computers—have their own language. Inside, they only understand electric signals of 1s and 0s. Thanks to computer scientists from the early days until now, we have built amazing bridges so humans and machines can understand each other!"
      ],
      pedagogicalTip: "Point to the left side (human languages) then to the right side (binary 0s and 1s) to emphasize the communication bridge."
    }
  },
  {
    id: 4,
    sectionId: '1',
    sectionName: 'SECTION 1 — From Human Language to Machine Language',
    title: 'What is a Programming Language?',
    subtitle: 'A bridge between human intention and computer execution.',
    caption: 'A way to give instructions to a computer, just like language lets us give instructions to people.',
    thread: 'python',
    layout: 'flags-logos',
    visualData: {
      languages: [
        { name: 'Python', color: '#38bdf8', icon: '🐍', tag: 'Readable & Universal' },
        { name: 'Java', color: '#f97316', icon: '☕', tag: 'Enterprise Systems' },
        { name: 'C++', color: '#3b82f6', icon: '⚡', tag: 'High Performance' },
        { name: 'JavaScript', color: '#facc15', icon: '🌐', tag: 'The Web' },
        { name: 'C#', color: '#a855f7', icon: '🎮', tag: 'Apps & Games' },
        { name: 'Ruby', color: '#ef4444', icon: '💎', tag: 'Developer Happiness' },
      ]
    },
    bullets: [
      'Translates our ideas into machine instructions',
      'Dozens of different dialects exist for different purposes',
      'Some are easy for humans; others are built strictly for the machine'
    ],
    speakerNotes: {
      timing: "3:00 - 4:45",
      hook: "Definisi bahasa pemrograman sebagai jembatan penerjemah / Programming language as a translation bridge.",
      speakingPoints: [
        "🇮🇩 ID: Nah, sampailah kita pada pertanyaan: jadi, sebenarnya apa itu bahasa pemrograman? Sederhananya, bahasa pemrograman adalah jembatan penerjemah antara ide di kepala kita dengan eksekusi di dalam komputer. Seperti halnya kita menggunakan bahasa untuk memberi instruksi ke orang lain, kita menggunakan bahasa pemrograman untuk memberi instruksi kepada komputer secara terstruktur. Di layar bisa kalian lihat, ada puluhan bahasa: ada Python, Java, C++, JavaScript, C#, dan lainnya. Masing-masing diciptakan dengan kelebihan dan tujuan spesifik. Lalu, bahasa mana yang menjadi raja di era Artificial Intelligence saat ini? Mari kita lihat perkembangannya!",
        "🇬🇧 EN (Level B1): Now, we arrive at the core question: what is a programming language, actually? Simply put, a programming language is a translation bridge between our human ideas and computer execution. Just like we use language to give instructions to people, we use programming languages to tell a computer what to do step by step. On the screen, you can see many famous languages: Python, Java, C++, JavaScript, C#, and more. Each was built for a specific purpose. So, among all these languages, which one is the true champion for Artificial Intelligence today? Let's explore its evolution!"
      ],
      pedagogicalTip: "Point out the interactive language bubbles on screen and emphasize that programming languages are tools designed to solve human problems."
    }
  },
  {
    id: 5,
    sectionId: '1',
    sectionName: 'SECTION 1 - From Human Language to Machine Language',
    title: 'Landscape & Evolution of Programming Languages',
    subtitle: 'From Vacuum Tubes & Binary Code (1940s) to Global AI Integration (2026)',
    thread: 'python',
    layout: 'minimal-timeline',
    visualData: {},
    speakerNotes: {
      timing: "4:45 - 7:30",
      hook: "Perjalanan 8 dekade evolusi bahasa pemrograman (1940s-2026) / 8-decade journey of programming evolution.",
      speakingPoints: [
        "🇮🇩 ID: Di slide ini kita melihat garis waktu evolusi bahasa pemrograman melintasi 5 era besar: (1) 1940s-1950s era tabung vakum, kode biner 1GL, dan lahirnya FORTRAN, LISP, COBOL; (2) 1960s-1980s era komputer mini, lahirnya bahasa C oleh Dennis Ritchie dan C++; (3) 1990s era revolusi Web dan lahirnya Python oleh Guido van Rossum tahun 1991, disusul Java dan JS; (4) 2000s-2010s era Cloud dan Mobile dengan Go, Rust, Kotlin, dan TypeScript; (5) 2020s-2026 era Artificial Intelligence di mana Python merajai industri didampingi Mojo dan PyScript.",
        "🇬🇧 EN (Level B1): On this slide, we explore the 8-decade journey of programming languages across 5 major eras: (1) 1940s-1950s vacuum tubes, binary machine code, and pioneers like FORTRAN, LISP, and COBOL; (2) 1960s-1980s minicomputers, structured programming, and Dennis Ritchie's legendary C and C++; (3) 1990s the internet revolution where Python was born in 1991 alongside Java, JavaScript, and PHP; (4) 2000s-2010s cloud and mobile era with Go, Rust, Kotlin, and TypeScript; (5) 2020s-2026 the AI era where Python rules supreme with accelerators like Mojo."
      ],
      pedagogicalTip: "Click through each era tab on the interactive timeline to show the corresponding 3D visualization and key milestones."
    }
  },
  {
    id: 6,
    sectionId: '1',
    sectionName: 'SECTION 1 - From Human Language to Machine Language',
    title: 'Which Language Dominates Today?',
    subtitle: 'Global Developer Census & Industry Adoption Index',
    thread: 'python',
    layout: 'ranking-chart',
    visualData: {
      surveySource: 'Source: https://www.tiobe.com/'
    },
    speakerNotes: {
      timing: "6.30 hingga 8.00",
      hook: "Membuktikan dominasi Python melalui sensus resmi TIOBE Index sedunia dan mengantarkan kebangkitan namanya.",
      speakingPoints: [
        "ID. Di hadapan kalian terpampang data sensus resmi dari TIOBE Index. Selama puluhan tahun posisi nomor satu selalu diperebutkan oleh bahasa C dan Java. Namun saat ini kalian bisa melihat bahwa Python kokoh berada di peringkat pertama dunia dengan pangsa lebih dari dua puluh persen. Mengapa bahasa yang lahir tahun 1991 ini bisa mengungguli raksasa korporasi dunia dan terus meroket naik? Mari kita saksikan fenomena kebangkitan satu nama besar ini di slide ke-7!",
        "EN. Right in front of you is the official technology census from the TIOBE Index. For decades the top spot was fought between C and Java. However right now Python stands firmly at rank number one with more than twenty percent share. Why did a language created in 1991 outpace giant corporations and keep climbing all the way to the top? Let us witness the phenomenal rise of this one great name on slide 7!"
      ],
      pedagogicalTip: "Tunjuk baris teratas pada tabel TIOBE lalu beri penekanan pada pertanyaan penutup sebelum berpindah slide."
    }
  },
  {
    id: 7,
    sectionId: '1',
    sectionName: 'SECTION 1 — From Human Language to Machine Language',
    title: 'The Rise of One Name',
    caption: 'One name keeps rising to the top — especially in one field.',
    thread: 'python',
    layout: 'python-zoom-reveal',
    visualData: {
      heroWord: 'Python',
      statBadge: '#1 Most Popular Programming Language in the World',
      metrics: [
        { label: 'Active Engineers', value: '18+ Million' },
        { label: 'AI & Data Science Share', value: '> 80%' },
        { label: 'First-Language Choice', value: '#1 Globally' },
      ]
    },
    speakerNotes: {
      timing: "8.00 hingga 9.30",
      hook: "Menyambung langsung nama Python dari sensus sebelumnya dan membongkar alasan kehebatannya.",
      speakingPoints: [
        "ID. Tepat sekali, nama besar yang kalian lihat di puncak sensus tadi adalah Python! Dari ribuan bahasa dalam sejarah komputasi, kebangkitan nama inilah yang saat ini mengubah seluruh wajah teknologi modern. Saat ini terdapat lebih dari delapan belas juta insinyur aktif dan lebih dari delapan puluh persen riset AI global dibangun di atasnya. Mengapa Python begitu dicintai dan bagaimana kodenya bekerja? Mari kita buktikan di slide berikutnya!",
        "EN. Exactly, the great name that you saw standing at the top of that global census is Python! Out of thousands of languages in computing history, the rise of this single name is what reshapes the modern technology landscape today. More than eighteen million active engineers rely on it and over eighty percent of global AI research is built on top of it. Why is Python so beloved and how does its code look? Let us prove it on the next slide!"
      ],
      pedagogicalTip: "Sambut nama Python dengan nada antusias sebagai jawaban langsung dari pertanyaan di akhir slide 6."
    }
  },

  // SECTION 2 — Getting to Know Python (before we even mention AI) (Slides 7 to 10)
  {
    id: 8,
    sectionId: '2',
    sectionName: 'SECTION 2 - Getting to Know Python',
    title: 'What is Python, really?',
    subtitle: 'Designed to be readable and almost like English.',
    caption: '',
    thread: 'python',
    layout: 'code-comparison',
    codeSnippets: [
      {
        language: 'java',
        label: 'Java - Traditional Boilerplate',
        code: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        output: 'Hello, World!'
      },
      {
        language: 'python',
        label: 'Python - Pure Human Intent',
        code: `print("Hello, World!")`,
        output: 'Hello, World!'
      }
    ],
    speakerNotes: {
      timing: "9.30 hingga 11.30",
      hook: "Membandingkan kerumitan Java dengan kesederhanaan murni Python.",
      speakingPoints: [
        "ID. Untuk membuktikan mengapa kode Python begitu dicintai, coba kalian perhatikan dua kotak kode di layar ini. Di sebelah kiri adalah Java yang membutuhkan lima baris kode rumit hanya untuk mencetak satu salam. Sementara di sebelah kanan adalah Python yang hanya membutuhkan satu baris sederhana yaitu print Hello World. Python menyingkirkan birokrasi sintaks agar pikiran kita fokus memecahkan masalah rekayasa kecerdasan buatan.",
        "EN. To prove why Python is so beloved, look at the two code boxes on the screen. On the left is Java which requires five lines of complex boilerplate just to print one greeting. Meanwhile on the right is Python which only needs one single readable line, that is print Hello World. Python removes all the syntax barriers so your brain can focus on solving real artificial intelligence engineering problems."
      ],
      pedagogicalTip: "Ajak mahasiswa membandingkan kedua kotak dan tekankan bahwa siapa saja yang memahami kata bahasa Inggris dasar sudah menguasai separuh dari Python."
    }
  },
  {
    id: 9,
    sectionId: '2',
    sectionName: 'SECTION 2 - Getting to Know Python',
    title: 'Where did Python come from?',
    subtitle: 'Conceived in the late 1980s by Guido van Rossum at CWI in the Netherlands.',
    caption: 'Named after the British comedy series Monty Python, not the snake.',
    thread: 'python',
    layout: 'origin-story',
    visualData: {
      creator: 'Guido van Rossum',
      role: 'Lead Developer & BDFL emeritus',
      birthplace: 'CWI (Centrum Wiskunde & Informatica), Netherlands',
      releaseYear: '1991 (v0.9.0)',
      funFact: 'Implementation began in December 1989 as a successor to the ABC programming language.'
    },
    speakerNotes: {
      timing: "11.30 hingga 13.00",
      hook: "Kisah inspiratif Guido van Rossum dan asal usul nama Python dari komedi BBC.",
      speakingPoints: [
        "ID. Inilah sosok hebat di balik keajaiban Python yaitu Guido van Rossum di lembaga riset CWI Belanda. Proyek ini dimulai pada bulan Desember tahun 1989 saat libur natal sebagai proyek hobi untuk menciptakan bahasa yang elegan dan mudah dibaca manusia. Nama Python bukan diambil dari ular melainkan dari acara komedi BBC Monty Python yang sangat digemari oleh Guido. Guido memimpin komunitas dengan julukan BDFL yang bijaksana hingga pensiun tahun 2018.",
        "EN. Here is the brilliant mind behind Python, namely Guido van Rossum at the CWI research center in the Netherlands. This project began in December 1989 during the Christmas holidays as a hobby project to create an elegant language that humans can read easily. The name Python was not taken from a snake but from a famous BBC comedy show Monty Python that Guido loved. Guido led the global community as a wise leader until retiring in 2018."
      ],
      pedagogicalTip: "Ceritakan kisah proyek hobi libur natal dengan nada hangat dan humoris tentang asal usul komedi Monty Python."
    }
  },
  {
    id: 10,
    sectionId: '2',
    sectionName: 'SECTION 2 - Getting to Know Python',
    title: 'How did it take over?',
    subtitle: 'From a modest scripting language to the backbone of global science',
    thread: 'python',
    layout: 'growth-curve',
    bullets: [
      '1990s - System Scripting & Automation Era',
      '2000s - Scientific Computing & Academic Adoption',
      '2010s - Data Science & Machine Learning Explosion',
      '2020s+ - Universal Standard & Lingua Franca of AI'
    ],
    visualData: {
      phases: [
        { era: '1990s', title: 'System Scripting', desc: 'Replacing tedious shell scripts and Perl with clean human-friendly syntax' },
        { era: '2000s', title: 'Scientific Computing', desc: 'Mathematicians & biologists adopt NumPy and SciPy for fast matrix research' },
        { era: '2010s', title: 'Data Science Explosion', desc: 'Pandas & Jupyter notebooks revolutionize data analytics and machine learning' },
        { era: '2020s+', title: 'The Universal Language', desc: 'Default lingua franca for modern technology and AI supercomputing' }
      ]
    },
    speakerNotes: {
      timing: "13.00 hingga 14.45",
      hook: "Menyambung kisah hobi Guido menuju lompatan empat dekade revolusi Python menguasai dunia.",
      speakingPoints: [
        "ID. Nah, setelah kita mengetahui bahwa Python bermula dari sebuah proyek hobi saat liburan natal oleh seorang Guido van Rossum pada tahun 1989, timbul satu pertanyaan besar di benak kita semua. Bagaimana mungkin sebuah bahasa skrip sederhana buatan satu orang programmer di Belanda bisa melesat mengambil alih dunia komputasi dan menjadi tulang punggung sains global seperti saat ini? Jawabannya terangkum dalam kurva pertumbuhan empat dekade emas yang terpampang di layar ini. Pertama, dekade 1990-an yaitu Era Skrip Sistem dan Otomasi, di mana Python menggantikan skrip shell serta Perl yang rumit dengan sintaksis yang jauh lebih bersih dan ramah manusia. Kedua, dekade 2000-an yakni Era Komputasi Ilmiah dan Adopsi Akademisi, saat para ilmuwan dunia beralih ke pustaka NumPy dan SciPy untuk komputasi matriks kilat tanpa pusing kebocoran memori. Ketiga, dekade 2010-an yang menjadi Era Ledakan Sains Data dan Pembelajaran Mesin lewat kehadiran Pandas serta Jupyter Notebook. Keempat, dekade 2020-an hingga masa kini yaitu Standar Universal dan Lingua Franca Kecerdasan Buatan yang menggerakkan superkomputer riset hingga model bahasa masif dunia. Lalu mengapa justru Python yang memenangkan perlombaan ini dan bukan bahasa lainnya? Mari kita buktikan di slide berikutnya!",
        "EN. Having seen how Python began as Guido van Rossum's Christmas holiday hobby project in 1989, the big question arises. How did such a modest scripting language take over global computing and become the backbone of modern science? This remarkable growth journey is captured across four golden decades on the screen. First, the 1990s, namely the System Scripting and Automation Era, where Python replaced cumbersome shell scripts and Perl with clean, human-friendly syntax. Second, the 2000s, which was the Scientific Computing and Academic Adoption Era, as scientists adopted NumPy and SciPy for lightning-fast matrix calculations without low-level memory leaks. Third, the 2010s, marking the massive Data Science and Machine Learning Explosion powered by Pandas and Jupyter Notebooks. Fourth, the 2020s and beyond, establishing Python as the Universal Standard and Lingua Franca of Artificial Intelligence worldwide. So why did Python win while others fell behind? Let us uncover the winning secrets on the next slide!"
      ],
      pedagogicalTip: "Arahkan mahasiswa menyimak grafik kurva pertumbuhan fase demi fase mulai dari 1990s hingga era kecerdasan buatan masa kini."
    }
  },
  {
    id: 11,
    sectionId: '2',
    sectionName: 'SECTION 2 - Getting to Know Python',
    title: 'Why did Python win, not the others?',
    subtitle: 'The golden balance of modern engineering',
    thread: 'python',
    layout: 'three-column-compare',
    bullets: [
      'Speed to Code - 10x Faster Prototyping',
      'Ease of Learning - Zero Syntax Clutter',
      'Unrivaled Ecosystem - Over 500,000 Packages'
    ],
    visualData: {
      columns: [
        {
          title: 'Speed to Code',
          metric: '10x Faster Prototyping',
          icon: '⚡',
          detail: 'Write what you think in minutes, not days of debugging pointers.',
          color: '#38bdf8'
        },
        {
          title: 'Ease of Learning',
          metric: 'Zero Clutter',
          icon: '🌱',
          detail: 'No memory management, no type gymnastics, plain English keywords.',
          color: '#f59e0b'
        },
        {
          title: 'Unrivaled Ecosystem',
          metric: '500,000+ Packages',
          icon: '📦',
          detail: 'Whatever you want to build, someone already wrote the foundational library.',
          color: '#10b981'
        }
      ]
    },
    speakerNotes: {
      timing: "14.45 hingga 16.30",
      hook: "Menjawab pertanyaan mengapa Python menang dengan tiga pilar kecepatan pengembang dan ekosistem.",
      speakingPoints: [
        "ID. Menyambung pertanyaan besar di akhir slide sebelumnya, mengapa justru Python yang keluar sebagai pemenang mutlak dan bukan bahasa pemrograman lain seperti C++, Java, atau C#? Bukankah bahasa seperti C++ jauh lebih cepat saat dieksekusi oleh prosesor komputer? Sebagai calon insinyur rekayasa komputer, kita harus membedakan antara kecepatan mesin dengan kecepatan pengembang. Di layar ini terdapat tiga pilar rahasia keseimbangan emas yang membuat Python tak terkalahkan. Pilar pertama yaitu Kecepatan Menulis Kode atau Speed to Code, di mana Anda bisa menuangkan ide menjadi purwarupa sepuluh kali lebih cepat dalam hitungan menit tanpa berhari-hari mengurusi pointer memori yang rumit. Pilar kedua yakni Kemudahan Pembelajaran atau Ease of Learning, karena Python membuang seluruh birokrasi sintaksis dan menggunakan kosakata bahasa Inggris yang sangat alami. Pilar ketiga adalah Ekosistem Tanpa Tanding atau Unrivaled Ecosystem dengan lebih dari lima ratus ribu paket pustaka siap pakai. Hebatnya lagi, di balik layar pustaka-pustaka Python tersebut sebenarnya ditulis menggunakan bahasa C yang sangat teroptimasi, sehingga kita mendapatkan kenyamanan menulis Python sekaligus kecepatan eksekusi setara bahasa C. Sekarang kita sudah memahami mengapa Python menjadi alat terhebat, namun alat ini tentu membutuhkan sebuah mahakarya. Lalu apa sebenarnya Kecerdasan Buatan itu dan bagaimana cara kerjanya? Mari kita masuki dunia AI di slide berikutnya!",
        "EN. Following the big question at the end of our previous slide, why did Python emerge as the ultimate winner instead of other languages like C++, Java, or C#? After all, isn't a language like C++ much faster on the CPU? As future computer engineering specialists, we must understand the difference between Machine Speed and Developer Speed. Right here on the screen are the three pillars of the golden balance that made Python unbeatable. The first pillar is Speed to Code, delivering up to ten times faster prototyping in minutes rather than spending days debugging complex memory pointers. The second pillar is Ease of Learning with zero syntax clutter, no manual memory allocation, and keywords written in plain natural English. The third pillar is an Unrivaled Ecosystem of more than five hundred thousand open-source packages. Even better, underneath the surface, these libraries are written in highly optimized C, giving you Python's writing comfort alongside C's raw execution speed. Now that we understand why Python is the ultimate tool, what actually is Artificial Intelligence, and how does it truly work under the hood? Let us dive into the world of AI on the next slide!"
      ],
      pedagogicalTip: "Tekankan perbedaan vital antara kecepatan mesin dan kecepatan pengembang serta jembatani menuju pengenalan AI di slide 12."
    }
  },

  // SECTION 3 — Now Let's Talk About AI (still separate from Python for now) (Slides 11 to 14)
  {
    id: 12,
    sectionId: '3',
    sectionName: 'SECTION 3 - Now Let\'s Talk About AI',
    title: 'What is AI, really?',
    subtitle: 'Debunking myths while building JARVIS-era intelligence',
    caption: 'What AI Is vs What AI Is Not',
    thread: 'ai',
    layout: 'ai-definition',
    bullets: [
      'Core Foundations - Pattern Learning & Matrix Optimization',
      'Modern Applications - ML, Vision, LLMs & Autonomous Systems',
      'Future Horizon - Will conscious AGI stay fiction or become reality?'
    ],
    visualData: {
      fact: [
        { icon: '⚙️', title: 'Pattern Learning', text: 'Statistical algorithms, decision trees, regression, and data optimization' },
        { icon: '🎯', title: 'Neural & GPU Computing', text: 'High-speed matrix math, linear algebra, and parallel GPU execution' }
      ],
      applications: [
        { icon: '📊', title: 'Predictive Analytics & Vision', text: 'Medical image analysis, fraud detection, and recommendation engines' },
        { icon: '🤖', title: 'Multimodal LLMs & Systems', text: 'Language models, voice, computer vision, and autonomous robotics' }
      ],
      fiction: [
        { icon: 'fa-solid fa-brain', title: 'Sentient Conscious AGI', text: 'Self-aware humanoid machines with feelings and intent' }
      ]
    },
    speakerNotes: {
      timing: "16.30 hingga 18.15",
      hook: "Membongkar mitos fiksi ilmiah dan menanamkan pemahaman rekayasa bahwa AI adalah pengenalan pola matematis.",
      speakingPoints: [
        "ID. Nah, menyambung pertanyaan di akhir slide sebelumnya, apa sebenarnya Kecerdasan Buatan atau Artificial Intelligence itu? Saat mendengar kata AI, banyak orang langsung membayangkan robot pembunuh bermata merah dari film fiksi ilmiah Hollywood yang memiliki kesadaran dan emosi. Sebagai calon insinyur rekayasa komputer, mari kita lupakan mitos tersebut. Kecerdasan Buatan di dunia nyata sama sekali bukan sihir mistis, melainkan murni pengenalan pola atau pattern recognition berbasis matematika terapan dan statistik. Jika kalian menyodorkan seratus ribu foto kucing dan seratus ribu foto anjing ke sebuah model algoritma, komputer akan menghitung gradien piksel dan mengoptimasi matriks angka hingga mampu membedakan keduanya secara mandiri. Inilah fondasi nyata yang melahirkan aplikasi luar biasa di sekitar kita, mulai dari diagnosis citra medis, pendeteksi penipuan transaksi perbankan, hingga model bahasa multimodal masa kini. Namun pernahkah kalian bertanya, sejak kapankah konsep kecerdasan buatan ini sebenarnya lahir di muka bumi? Mari kita telusuri garis waktu sejarahnya di slide ke-13!",
        "EN. Connecting back to the question at the end of our previous slide, what actually is Artificial Intelligence? When hearing the word AI, many people immediately picture Hollywood sci-fi movies featuring killer robots with red glowing eyes that possess human consciousness and feelings. As future computer engineering specialists, let us leave those fictional myths behind. Artificial Intelligence in real computer engineering is not magic at all, but rather pure pattern recognition driven by applied mathematics, linear algebra, and statistical optimization. If you feed an algorithm one hundred thousand photos of cats and one hundred thousand photos of dogs, it calculates pixel gradients and optimizes numbers until it spots the differences automatically. This real engineering foundation is what powers modern breakthroughs like medical imaging diagnostics, financial fraud detection, and multimodal large language models. But have you ever wondered, since when has the concept of artificial intelligence actually existed on Earth? Let us trace its fascinating historical timeline on slide 13!"
      ],
      pedagogicalTip: "Bongkar ilusi sihir AI dan ajak mahasiswa melihat bahwa di balik kecanggihannya terdapat perhitungan matriks dan pola data yang logis."
    }
  },
  {
    id: 13,
    sectionId: '3',
    sectionName: 'SECTION 3 - Now Let\'s Talk About AI',
    title: 'Since when has AI existed?',
    subtitle: 'From 9th century algebra foundations to modern generative AI',
    thread: 'ai',
    layout: 'ai-timeline',
    bullets: [
      'Part 1: Foundations & Birth of AI (820 AD - 1974)',
      'Part 2: AI Winter to Generative Era (1974 - Present)'
    ],
    visualData: {
      eras: [
        {
          period: '9th Century (820 AD)',
          title: 'Laying Mathematical Foundations',
          desc: 'Al-Khwarizmi created Algebra and Algorithms as the foundational mathematical logic for computing.',
          icon: 'fa-solid fa-calculator',
          highlights: ['820 AD Al-Khwarizmi (Algebra & Algorithms)']
        },
        {
          period: '1940 - 1955',
          title: 'Pre-Birth & Computation Theory',
          desc: 'First mathematical Neural Network model created and Alan Turing introduced the Turing Test.',
          icon: 'fa-solid fa-microchip',
          highlights: ['1943 McCulloch-Pitts Neural Network', '1950 Alan Turing Test', '1951 First Chess AI Program']
        },
        {
          period: '1956 - 1974',
          title: 'Official Birth & Early Optimism',
          desc: 'The term Artificial Intelligence was coined at Dartmouth Conference, followed by LISP and ELIZA chatbot.',
          icon: 'fa-solid fa-diagram-project',
          highlights: ['1956 Dartmouth AI Term Coined', '1958 McCarthy LISP Language', '1966 Weizenbaum ELIZA Chatbot']
        },
        {
          period: '1974 - 1993',
          title: 'The AI Winter Era',
          desc: 'Two major research funding cuts (1974 & late 1980s) due to computing hardware limitations.',
          icon: 'fa-solid fa-snowflake',
          highlights: ['1974 First AI Winter (Funding Cut)', '1980s Expert Systems & Second Winter']
        },
        {
          period: '1993 - 2011',
          title: 'Resurgence & Era of Proof',
          desc: 'Computers defeated world chess champions and won human knowledge quiz competitions.',
          icon: 'fa-solid fa-trophy',
          highlights: ['1997 IBM Deep Blue vs Garry Kasparov', '2011 IBM Watson Jeopardy Victory']
        },
        {
          period: '2012 - Present',
          title: 'Deep Learning & Generative AI',
          desc: 'Internet Big Data and GPU chips birthed AlexNet, AlphaGo, Transformer architecture, and ChatGPT.',
          icon: 'fa-solid fa-brain',
          highlights: ['2012 AlexNet Deep Learning', '2016 Google DeepMind AlphaGo', '2017 Transformer Architecture', '2022-Present ChatGPT Surge']
        }
      ]
    },
    speakerNotes: {
      timing: "18.15 hingga 20.00",
      hook: "Menelusuri akar sejarah AI lintas milenium dari Al-Khwarizmi hingga ledakan Generative AI modern.",
      speakingPoints: [
        "ID. Nah, menyambung pertanyaan di akhir slide sebelumnya, apakah kecerdasan buatan baru lahir kemarin sore? Jawabannya sama sekali tidak! AI memiliki akar sejarah panjang yang membentang lebih dari seribu tahun. Fondasi matematika pertamanya diletakkan sejak abad ke-9 pada tahun 820 Masehi oleh ilmuwan Muslim Al-Khwarizmi yang menciptakan konsep Aljabar dan Algoritma. Berabad-abad kemudian pada era 1940-an hingga 1950-an, Alan Turing memperkenalkan Turing Test yang menguji apakah mesin dapat berpikir. Nama Artificial Intelligence sendiri resmi lahir pada Konferensi Dartmouth tahun 1956. Namun perjalanannya tidak selalu mulus, karena AI sempat mengalami periode AI Winter saat komputer belum cukup bertenaga dan data belum memadai. Baru pada era 1990-an kebangkitan dimulai saat IBM Deep Blue mengalahkan juara catur dunia, hingga akhirnya tahun 2012 GPU kilat dan Big Data internet melahirkan ledakan Deep Learning, arsitektur Transformer, serta era Generative AI saat ini. Lalu setelah berevolusi sedemikian panjang, bagaimana sebenarnya mesin bisa menjadi pintar? Mari kita bedah pergeseran paradigmanya di slide ke-14!",
        "EN. Connecting directly to our question on the previous slide, did Artificial Intelligence simply appear overnight? Not at all! AI has deep historical roots stretching across more than a millennium. Its mathematical foundations began in the 9th century in 820 AD when Muslim mathematician Al-Khwarizmi created Algebra and the concept of Algorithms. Centuries later in the 1940s and 1950s, Alan Turing introduced the famous Turing Test. The official name Artificial Intelligence was born at the Dartmouth Conference in 1956. However the journey faced harsh AI Winters when hardware was too weak and data was scarce. The turning point arrived in the late 1990s when IBM Deep Blue defeated the world chess champion, leading to the 2012 explosion of Deep Learning fueled by GPUs and internet Big Data, which gave birth to modern Transformers and Generative AI today. But after all these eras of evolution, how exactly can a machine be smart? Let us discover the fundamental paradigm shift on slide 14!"
      ],
      pedagogicalTip: "Ajak mahasiswa menelusuri garis waktu dari akar abad ke-9 hingga era modern untuk membongkar persepsi bahwa AI adalah tren instan."
    }
  },
  {
    id: 14,
    sectionId: '3',
    sectionName: 'SECTION 3 — Now Let\'s Talk About AI',
    title: 'How can AI be "smart"?',
    subtitle: 'The fundamental paradigm shift in computer science.',
    thread: 'ai',
    layout: 'old-vs-ai',
    bullets: [
      'Traditional Paradigm - Hand-written rules',
      'Machine Learning Paradigm - Inferring rules from data'
    ],
    visualData: {
      oldWay: {
        title: 'Traditional Programming',
        subtitle: 'Write every rule by hand',
        formula: 'Rules + Data  ➔  Answers',
        analogy: 'Like writing a 10,000-page cooking manual with every possible kitchen scenario'
      },
      aiWay: {
        title: 'Machine Learning (AI)',
        subtitle: 'Show it examples, it discovers the rules',
        formula: 'Data + Answers  ➔  Rules (Patterns)',
        analogy: 'Like tasting 500 great soups until your taste buds know the secret spice ratio'
      }
    },
    speakerNotes: {
      timing: "20.00 hingga 22.00",
      hook: "Membongkar momen Aha tentang pergeseran rumus logika tradisional menuju pembelajaran mesin.",
      speakingPoints: [
        "ID. Nah, menyambung pertanyaan besar di akhir slide sebelumnya, bagaimana sebenarnya sebuah mesin bisa menjadi pintar? Kuncinya terletak pada pergeseran paradigma paling fundamental dalam sejarah ilmu komputer. Coba kalian perhatikan perbandingan di layar ini. Dalam pemrograman tradisional, manusia harus menulis seluruh aturan secara manual. Rumusnya adalah Aturan ditambah Data menghasilkan Jawaban. Sebagai contoh pada filter email spam, jika kalian menulis aturan bahwa kata undian adalah spam, lalu pelaku menulis u-n-d-i-a-n dengan spasi, maka aturan manual kalian langsung hancur berantakan. Manusia tidak akan sanggup menulis jutaan aturan rapuh di dunia nyata. Namun dalam Machine Learning atau AI, rumusnya kita balik total! Komputer kita suapi dengan Data dan Jawaban, lalu komputernya sendiri yang menemukan Pola dan Aturan secara otomatis. Kita tinggal memasukkan sepuluh ribu email spam dan sepuluh ribu email normal, maka algoritma AI akan menghitung sidik jari statistiknya sendiri. Namun jika mesin belajar pola dari data, bahan baku apa sajakah yang dibutuhkan untuk membangun kecerdasan ini dari nol? Mari kita singkap tiga ramuan intinya di slide berikutnya!",
        "EN. Connecting directly to our question on the previous slide, how exactly can a machine be smart? The secret lies in the most fundamental paradigm shift in computer science history. Look closely at the comparison on the screen. In traditional programming, humans had to write every single rule by hand. The formula was Rules plus Data equals Answers. For instance, in an email spam filter, if you write a rule that the word lottery is spam, what happens when a spammer writes l-o-t-t-e-r-y with spaces? Your rule breaks instantly. Humans cannot write millions of fragile manual rules. In Machine Learning however, we completely invert the formula! We feed the machine Data and Answers, and the machine discovers the Rules and Patterns automatically. We simply supply ten thousand spam emails and ten thousand normal emails, and the algorithm calculates the statistical fingerprint on its own. But if AI discovers rules from data, what essential ingredients are actually required to build intelligence from scratch? Let us uncover the three core ingredients on the next slide!"
      ],
      pedagogicalTip: "Jelaskan dengan penekanan kuat pada pembalikan rumus Rules plus Data equals Answers menjadi Data plus Answers equals Rules."
    }
  },
  {
    id: 15,
    sectionId: '3',
    sectionName: 'SECTION 3 — Now Let\'s Talk About AI',
    title: 'What is AI actually built from?',
    subtitle: 'Three essential ingredients to create intelligence.',
    caption: 'Two of them are obvious. What is the missing catalyst?',
    thread: 'ai',
    layout: 'three-ingredients',
    bullets: [
      'Data - Examples, text, and sensory inputs',
      'Mathematics - Linear algebra, calculus, and probability',
      'Missing Catalyst - What breathes life into the mathematics?'
    ],
    visualData: {
      ingredients: [
        { num: '01', title: 'Data', desc: 'Examples, images, text, and sensory inputs to learn from', status: 'known', icon: '📊' },
        { num: '02', title: 'Mathematics', desc: 'Linear algebra, calculus, probability, and gradients', status: 'known', icon: '📐' },
        { num: '03', title: 'And... ?', desc: 'The missing engine that connects math to silicon', status: 'mystery', icon: '❓' }
      ]
    },
    speakerNotes: {
      timing: "22.00 hingga 23.30",
      hook: "Menciptakan rasa penasaran tinggi seputar ramuan ketiga yang menghidupkan matematika ke atas silikon komputer.",
      speakingPoints: [
        "ID. Nah, menyambung rasa penasaran kita di akhir slide sebelumnya, jika kita ingin merakit kecerdasan buatan dari nol, bahan baku apa sajakah yang sebenarnya dibutuhkan? Di hadapan kalian terpampang tiga ramuan esensial pembangun kecerdasan. Ramuan nomor satu adalah Data, yaitu jutaan contoh citra, teks, rekaman audio, dan data sensorik yang menjadi bahan bakar pembelajaran. Ramuan nomor dua adalah Matematika, yakni aljabar linier, kalkulus, teori probabilitas, serta optimasi fungsi gradien. Namun ada satu masalah besar, bahwa rumus matematika secanggih apapun yang tertulis di atas kertas tidak akan pernah bisa mengeksekusi dirinya sendiri! Rumus di buku catatan tidak akan bisa mengemudikan mobil otonom ataupun mendiagnosis tumor di rumah sakit. Kita membutuhkan ramuan ketiga yang menjadi katalis penghubung logika matematika menuju silikon chip komputer. Kira-kira apa ramuan misterius ketiga tersebut? Mari kita buka tabirnya di slide ke-16!",
        "EN. Connecting directly to our curiosity at the end of the previous slide, if we want to build artificial intelligence from scratch, what essential ingredients are actually required? Right in front of you are the three core ingredients of intelligence. Ingredient number one is Data, namely millions of images, text samples, audio recordings, and sensory streams that serve as fuel. Ingredient number two is Mathematics, which includes linear algebra, calculus, probability theory, and gradient optimization. But here lies a major dilemma, mathematical formulas written on paper can never execute themselves! Math in a textbook will never steer a self-driving car or diagnose illness in a hospital without a bridge. We desperately need a third ingredient, the missing catalyst that breathes life into mathematics and connects it to computer silicon chips. What is this mysterious third catalyst? Let us unveil the secret on slide 16!"
      ],
      pedagogicalTip: "Bangun ketegangan dan rasa penasaran di ruangan kelas, jangan langsung berpindah slide sebelum mahasiswa menebak ramuan ketiga."
    }
  },

  // SECTION 4 — Where the Two Stories Meet (Slides 15 to 16)
  {
    id: 16,
    sectionId: '4',
    sectionName: 'SECTION 4 — Where the Two Stories Meet',
    title: 'The Convergence',
    caption: 'Most of today\'s AI is built using Python.',
    thread: 'convergence',
    layout: 'big-reveal',
    bullets: [
      'The Two Parallel Worlds - Readable Code & Neural Intelligence',
      'The Unified Catalyst - Over 85% of AI Built on Python'
    ],
    visualData: {
      revealedIngredient: 'A Programming Language',
      winnerName: 'Python',
      leadQuote: 'The common tongue of artificial intelligence.',
      stat: 'Over 85% of machine learning research papers and production AI systems use Python.'
    },
    speakerNotes: {
      timing: "23.30 hingga 25.30",
      hook: "Puncak emosional pertama saat dua alur cerita besar bersatu dalam konvergensi nama Python.",
      speakingPoints: [
        "ID. Inilah jawaban dari teka-teki ramuan ketiga kita tadi, yaitu sebuah Bahasa Pemrograman! Dan bukan sembarang bahasa pemrograman, melainkan Python! Selamat datang di titik konvergensi akbar. Kisah pencarian bahasa pemrograman yang ramah manusia dan kisah kelahiran kecerdasan buatan bukanlah dua cerita yang terpisah, melainkan satu kesatuan perjalanan agung yang bertemu di sini. Lebih dari delapan puluh lima persen makalah riset ilmiah serta sistem kecerdasan buatan produksi dunia dibangun di atas Python. Tanpa kehadiran Python, kecerdasan buatan mungkin akan terkunci di laboratorium korporasi elit yang mahal dan terisolasi. Python berhasil mendemokratisasi kecerdasan buatan untuk seluruh umat manusia. Namun mengapa secara spesifik dunia AI memilih Python dan persenjataan pustaka ilmiah apa sajakah yang bersemayam di dalamnya? Mari kita bedah di slide ke-17!",
        "EN. Here is the grand answer to our mystery third ingredient, namely A Programming Language! And not just any language, but Python! Welcome to the great moment of Convergence. The story of human-friendly programming and the story of artificial intelligence are not two separate tales, but rather one single epic journey unifying right here. Over eighty-five percent of global machine learning research papers and production systems are built on Python. Without Python, modern AI might have remained locked away inside isolated, expensive corporate research facilities. Python truly democratized intelligence for humanity. But why specifically did the AI world choose Python, and what legendary scientific libraries live inside its ecosystem? Let us explore them on slide 17!"
      ],
      pedagogicalTip: "Beri penekanan dramatis saat nama Python terungkap sebagai titik temu antara dunia kode dan kecerdasan buatan."
    }
  },
  {
    id: 17,
    sectionId: '4',
    sectionName: 'SECTION 4 — Where the Two Stories Meet',
    title: 'Why Python, specifically, for building AI?',
    subtitle: 'The greatest scientific library ecosystem in human history.',
    thread: 'convergence',
    layout: 'why-python-grid',
    bullets: [
      'Core Engineering Decisive Reasons - High Velocity & C/CUDA Execution',
      'The Scientific Ecosystem - NumPy, Pandas, Scikit-learn, TensorFlow & PyTorch'
    ],
    visualData: {
      ecosystem: [
        { name: 'NumPy', tag: 'Fast Array & Matrix Math', icon: '🔢', color: '#4ade80' },
        { name: 'Pandas', tag: 'Data Wrangling & Tables', icon: '🐼', color: '#38bdf8' },
        { name: 'Scikit-learn', tag: 'Classical Machine Learning', icon: '🧠', color: '#fbbf24' },
        { name: 'TensorFlow', tag: 'Production Neural Networks', icon: '🟧', color: '#f97316' },
        { name: 'PyTorch', tag: 'Research & Generative AI', icon: '🔥', color: '#ef4444' },
      ],
      reasons: [
        'Researchers publish ideas in code that any university student can run with one click.',
        'Pre-compiled C/CUDA engines beneath elegant, readable Python syntax.'
      ]
    },
    speakerNotes: {
      timing: "25.30 hingga 27.30",
      hook: "Mengingatkan kembali benang merah keunggulan Python dari slide sebelumnya lalu membongkar ekosistem sains AI.",
      speakingPoints: [
        "ID. Menjawab pertanyaan di akhir slide sebelumnya, mengapa komunitas kecerdasan buatan global secara spesifik memilih Python dan bukan bahasa pemrograman lainnya? Sebagaimana yang sudah kita bahas sebelumnya, mulai dari dominasi Python pada sensus global, kemudahan sintaksisnya yang menyerupai bahasa manusia, hingga tiga pilar keunggulan kecepatan pengembang yang kita bedah sebelumnya. Kini kita tiba pada alasan penentu yang paling krusial. Kuncinya terletak pada ekosistem pustaka sains terhebat dalam sejarah komputasi yang terpampang di hadapan kalian saat ini. Para ilmuwan AI ingin menuangkan gagasan riset dengan cepat tanpa terjebak alokasi memori manual. Melalui Python, sebuah inovasi dapat diuji oleh peneliti di seluruh dunia hanya dalam hitungan menit. Di layar ini terdapat lima pilar utama yang menggerakkan dunia yaitu NumPy untuk kalkulasi matriks kilat, Pandas untuk pemrosesan tabel data masif, Scikit-learn untuk algoritma machine learning, serta TensorFlow dan PyTorch yang menjadi fondasi jaringan saraf tiruan modern dari Google hingga OpenAI. Keunggulan terbesarnya adalah seluruh pustaka ini ditenagai mesin bahasa C dan akselerator kartu grafis CUDA di balik layar, sehingga kita menikmati keindahan sintaks Python dengan kecepatan eksekusi superkomputer. Dan sekarang setelah kita merajut seluruh gambaran besar dari nol, tibalah saatnya kita melangkah ke gerbang utama perkuliahan kita di slide ke-18!",
        "EN. Answering our question from the previous slide, why specifically did the global artificial intelligence community choose Python instead of any other language? As we have discussed in our previous slides, from Python dominating the global rankings, its remarkably human-friendly syntax, to the three pillars of developer speed we examined earlier. Now we arrive at the ultimate decisive reason. The key lies in the greatest scientific library ecosystem in computing history, displayed right here before you. AI researchers want to communicate mathematical ideas rapidly without getting bogged down in low-level memory allocation. Through Python, an idea published in a paper can be tested by colleagues across the globe in just minutes. On this screen are the five legendary tools powering modern intelligence, namely NumPy for lightning-fast matrix arrays, Pandas for handling massive data tables, Scikit-learn for machine learning models, and TensorFlow alongside PyTorch as the deep learning engines powering tech giants from Google to OpenAI. Best of all, beneath Python's clean and elegant syntax, these libraries run on pre-compiled C engines and CUDA GPU accelerators. Now that we have connected the entire story from scratch, it is time to step into the official gateway of our course on slide 18!"
      ],
      pedagogicalTip: "Ingatkan kembali keterkaitan materi dari sensus dan pilar Python sebelum memaparkan lima pustaka sains AI."
    }
  },

  // SECTION 5 — Course Introduction (Slide 17)
  {
    id: 18,
    sectionId: '5',
    sectionName: 'SECTION 5 — Course Introduction',
    title: 'Python for AI',
    subtitle: '',
    caption: '',
    thread: 'convergence',
    layout: 'official-title',
    visualData: {
      university: 'Faculty of Computer Engineering',
      campus: 'Department of Computer Science & AI',
      degree: 'BSc Computer Engineering',
      lecturerPlaceholder: 'Faculty of Computer Engineering & Data Science',
      academicYear: 'Academic Year 2026 / 2027 • Semester 1',
      sessionCode: 'ENG-CS-PYAI-101'
    },
    speakerNotes: {
      timing: "27.30 hingga 29.30",
      hook: "Puncak emosional kedua saat judul resmi mata kuliah diungkapkan setelah rangkaian narasi mendalam.",
      speakingPoints: [
        "ID. Selamat datang secara resmi di mata kuliah kebanggaan kita, Python for AI! Mungkin sebagian dari kalian sempat bertanya-tanya di dalam hati, mengapa dosen kita menghabiskan waktu hampir setengah jam bercerita panjang lebar tanpa langsung menampilkan judul mata kuliah di awal? Jawabannya sangat sederhana namun mendasar. Di program studi rekayasa komputer, kita tidak dididik untuk sekadar menghafal alat atau mengetik kode secara buta. Kita harus memahami mengapa teknologi itu lahir, dari mana akar sejarahnya berasal, serta seberapa besar kekuatan yang kini berada di genggaman tangan kalian. Mulai hari ini, setiap orang dari kalian resmi memulai langkah pertama perjalanan agung menjadi seorang AI Engineer masa depan. Dan sekarang setelah gerbang resmi dibuka, peralatan apa sajakah yang sesungguhnya kita butuhkan di meja kerja seorang AI engineer? Mari kita lihat peta besarnya di slide ke-19!",
        "EN. Welcome, officially, to our proud course, Python for AI! Some of you might have wondered why we spent nearly half an hour exploring history, mathematics, and logic before officially revealing our course title. The reason is simple yet profound. In computer engineering, we do not just blindly memorize tools or copy syntax. We must understand why a technology was created, where its roots came from, and what immense power it places directly into your hands. Starting today, every single one of you begins an extraordinary journey toward becoming a future AI Engineer. Now that our official gateway is open, what specific tools do we actually need on the workbench of an AI engineer? Let us explore the big picture on slide 19!"
      ],
      pedagogicalTip: "Rayakan momen ini dengan senyuman hangat dan nada bangga yang memantik antusiasme mahasiswa menyambut babak baru perkuliahan."
    }
  },

  // SECTION 6 — The Big Picture First (Slides 18 to 21)
  {
    id: 19,
    sectionId: '6',
    sectionName: 'SECTION 6 — The Big Picture First',
    title: 'What tools do we actually need to build AI?',
    subtitle: 'From raw numbers and tabular datasets to neural networks and live inference.',
    thread: 'convergence',
    layout: 'before-tools-question',
    bullets: [
      'The Essential AI Engineering Stack - Foundational Tiers',
      'The 5 Scientific Libraries Powering Global AI - NumPy, Pandas, Scikit-learn, PyTorch & TensorFlow'
    ],
    speakerNotes: {
      timing: "29.30 hingga 31.00",
      hook: "Memandu dosen menjelaskan Tab 1 dua tingkatan arsitektur serta Tab 2 tiga langkah alur pipa perakitan AI.",
      speakingPoints: [
        "ID. Nah, menyambung pertanyaan di akhir slide sebelumnya, peralatan apa sajakah yang sesungguhnya kita butuhkan di meja kerja seorang praktisi kecerdasan buatan? Pada Tab 1 kita melihat Dua Tingkatan Arsitektur Inti. Tingkat pertama adalah Fondasi Data dan Angka tempat NumPy dan Pandas mengubah sinyal mentah menjadi matriks angka. Tingkat kedua adalah Otak Pembelajaran tempat Scikit-learn, PyTorch, dan TensorFlow melatih model saraf tiruan. Kemudian saat kita beralih ke Tab 2, kita melihat Tiga Langkah Alur Pipa Perakitan AI secara nyata. Langkah pertama adalah Ingesti Sinyal Mentah menggunakan NumPy untuk mengubah piksel kamera menjadi matriks tensor berkecepatan tinggi. Langkah kedua adalah Pembersihan Data menggunakan Pandas yang berfungsi bagaikan lembar sebar terprogram untuk membuang data rusak dan merapikan tabel fitur X dan y. Langkah ketiga adalah Pelatihan Model dan Inferensi Langsung menggunakan Scikit-learn, PyTorch, dan TensorFlow untuk mengoptimasi jutaan bobot model hingga menghasilkan keputusan cerdas secara real-time. Namun bagaimana perkakas ilmiah ini bisa berjalan hingga ratusan kali lipat lebih cepat dan bagaimana wujud nyatanya saat melatih model kecerdasan buatan hanya dalam enam baris kode? Mari kita saksikan pembuktiannya di slide ke-20!",
        "EN. Connecting directly to our question on the previous slide, what tools do we actually need on the workbench of an artificial intelligence practitioner? On Tab 1, we observe the Two Core Architectural Tiers. Tier One is the Numerical Foundation where NumPy and Pandas convert raw signals into matrix fuel. Tier Two is the Cognitive Brain where Scikit-learn, PyTorch, and TensorFlow train intelligent neural models. Next, moving to Tab 2, we explore the Three Steps of the AI Assembly Pipeline. Step One is Raw Sensor and Matrix Ingestion using NumPy to transform camera pixels and raw sensor data into high-speed tensors. Step Two is Data Cleaning and Structuring using Pandas, acting as an ultra-fast programmable spreadsheet to eliminate missing data and structure clean feature tables. Step Three is Model Training and Live Inference using Scikit-learn, PyTorch, and TensorFlow to optimize millions of weights on GPUs and output real-time predictions. But how do these scientific tools actually run hundreds of times faster on silicon, and how does training a real model look in just six lines of code? Let us witness the live demonstration on slide 20!"
      ],
      pedagogicalTip: "Pandu mahasiswa menyimak Tab 1 dua tingkatan arsitektur lalu klik Tab 2 untuk menjelaskan ketiga langkah pipeline secara runtut."
    }
  },

  {
    id: 20,
    sectionId: '6',
    sectionName: 'SECTION 6 — The Big Picture First',
    title: 'How do these tools actually run so fast and train a real AI model?',
    subtitle: 'Unleashing hardware-level parallel vectorization and training a live Machine Learning classifier in 6 lines of Python.',
    caption: 'Side-by-side: doing one calculation at a time vs. crunching an entire array in parallel.',
    thread: 'convergence',
    layout: 'vectorization-speed',
    bullets: [
      'A Sneak Peek at the Magic: Vectorization - 116x Faster Parallel C/SIMD Array Math',
      'Watch AI Learn, Live - Training a Real Machine Learning Model in 6 Lines of Code'
    ],
    codeSnippets: [
      {
        language: 'python',
        label: 'The Slow Way: Manual Python Loop',
        code: `# 1. Input: Python list of 1,000,000 integers
numbers = [1, 2, 3, 4, 5, ...]

# 2. Sequential loop: element-by-element append
result = []
for x in numbers:
    result.append(x * 2)

# 3. Output Type: standard python list
# result = [2, 4, 6, 8, 10, ...]`,
        output: 'Elapsed Time: ~ 128.4 ms'
      },
      {
        language: 'python',
        label: 'The AI Way: Vectorized Array (NumPy)',
        code: `import numpy as np

# 1. Input: Contiguous C-array of 1,000,000 integers
numbers = np.array([1, 2, 3, 4, 5, ...])

# 2. Vectorized multiplication across parallel SIMD lanes
result = numbers * 2

# 3. Output Type: numpy.ndarray (C-buffer)
# result = array([2, 4, 6, 8, 10, ...])`,
        output: 'Elapsed Time: ~ 1.1 ms (116x Faster!)'
      },
      {
        language: 'python',
        label: 'train_classifier.py (Scikit-learn)',
        code: `from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris

# 1. Load dataset & create model
data = load_iris()
model = DecisionTreeClassifier(max_depth=3)

# 2. Train the model on examples
model.fit(data.data, data.target)

# 3. Predict an unseen flower sample
prediction = model.predict([[5.1, 3.5, 1.4, 0.2]])
print("Predicted Flower Class:", data.target_names[prediction[0]])`,
        output: `Training complete on 150 flower samples.
Accuracy Score: 98.6%
Sample Features: [SepalLength=5.1, SepalWidth=3.5, PetalLength=1.4, PetalWidth=0.2]
>>> Predicted Flower Class: Setosa`
      }
    ],
    speakerNotes: {
      timing: "31.00 hingga 37.30",
      hook: "Membuktikan kecepatan mutlak vektorisasi pada Step 1 serta mendemonstrasikan pelatihan model AI 6 baris pada Step 2.",
      speakingPoints: [
        "ID. Nah, menyambung rasa penasaran kita di akhir slide sebelumnya, bagaimana perkakas ilmiah ini bisa bekerja begitu cepat dan bagaimana wujud nyatanya saat melatih model AI dalam enam baris kode? Pada slide ini kita memiliki dua tahap pembuktian langsung. Tahap pertama atau Step 01 adalah Keajaiban Vektorisasi. Coba kalian perhatikan kedua potongan kode di layar. Pada sisi kiri, kita memiliki variabel numbers berupa list Python biasa berisi satu juta bilangan bulat. Kita membuat list kosong result sama dengan kurung siku buka kurung siku tutup, lalu melalui perulangan for x in numbers, CPU memproses elemen demi elemen secara berurutan dan memasukkan hasilnya satu per satu dengan append. Jika kalian menekan tombol Jalankan Simulasi di layar, kalian bisa melihat sendiri bagaimana satu inti CPU harus berputar mengambil angka satu, memeriksa tipe data, mengalokasikan memori, hingga waktu eksekusi merangkak naik mencapai seratus dua puluh delapan koma empat milidetik dengan tipe hasil list biasa. Sekarang bandingkan dengan sisi kanan. Variabel numbers dikemas sebagai numpy ndarray di dalam blok memori C yang padat. Dengan hanya menuliskan result sama dengan numbers dikali dua, prosesor langsung mengaktifkan jalur perangkat keras SIMD secara paralel serentak dalam satu pulsa komputasi. Hasilnya keluar hanya dalam waktu satu koma satu milidetik, alias seratus enam belas kali lipat lebih cepat, dengan tipe hasil resmi numpy ndarray. Kemudian saat kita melangkah ke Tahap kedua atau Step 02, kita menyaksikan pembuktian kedua yaitu bagaimana AI belajar secara langsung hanya dalam enam baris kode Scikit-learn. Kita memuat seratus lima puluh data bunga Iris, melatih model Decision Tree, dan langsung memprediksi kelas bunga secara real-time dengan akurasi sembilan puluh delapan koma enam persen. Namun bagaimana kita bisa merakit kecerdasan buatan sehebat ini dari nol? Mari kita bongkar enam balok fondasi dasarnya di slide ke-21!",
        "EN. Connecting directly to our curiosity at the end of the previous slide, how do these scientific tools run so fast, and what does training an AI model in just six lines of code look like? On this slide, we have two live demonstration steps. Step 01 reveals the Magic of Vectorization. Look at the two code snippets on screen. On the left, our numbers variable is a standard Python list of one million integers. We initialize an empty list result, then run a manual for-loop where the CPU processes each element sequentially and appends values one by one. Clicking the Run Simulation button lets you watch a single CPU core laboriously iterate through heap pointers, taking 128.4 milliseconds to produce a standard list. Now look at the right side. Our numbers variable is an array in contiguous C memory. Writing result equals numbers times two unleashes hardware SIMD lanes to compute the entire array in parallel within a single clock pulse, finishing in just 1.1 milliseconds, which is 116 times faster, returning a true numpy ndarray. Next, in Step 02, we watch machine learning live in just six lines using Scikit-learn, training a Decision Tree on 150 Iris flower samples and running real-time prediction with 98.6 percent accuracy. But how can we write such programs ourselves from scratch? Let us unpack the six fundamental building blocks on slide 21!"
      ],
      pedagogicalTip: "Pandu mahasiswa membandingkan benchmark 116x lipat pada Step 1 lalu klik Run Code pada Step 2 untuk melihat model machine learning berlatih live."
    }
  },

  // SECTION 6 — Python Foundations from Zero (Slides 20 to 26)
  {
    id: 21,
    sectionId: '6',
    sectionName: 'SECTION 6 — Python Foundations from Zero',
    title: 'How can we write that AI code ourselves from zero?',
    subtitle: 'None of this magic is possible without the fundamentals. Let\'s take it apart, piece by piece.',
    caption: 'To build intelligence, you must first master the 6 building blocks.',
    thread: 'convergence',
    layout: 'exploding-transition',
    bullets: [
      'The 6 Foundational Building Blocks of Python: Variables, Data Types, print(), if/else, for loops, and Functions'
    ],
    visualData: {
      explodedFragments: [
        { label: 'Variables', role: 'Memory Containers', color: '#38bdf8' },
        { label: 'Data Types', role: 'Numbers, Text, Booleans', color: '#f59e0b' },
        { label: 'print()', role: 'Standard Output', color: '#10b981' },
        { label: 'if / else', role: 'Decision Branching', color: '#a855f7' },
        { label: 'for loops', role: 'Repetition Engine', color: '#ec4899' },
        { label: 'functions', role: 'Reusable Machinery', color: '#06b6d4' },
      ]
    },
    speakerNotes: {
      timing: "37.30 hingga 40.00",
      hook: "Mendekonstruksi kode kecerdasan buatan Scikit-learn yang tampak ajaib menjadi enam balok lego fondasi pemrograman Python dari nol.",
      speakingPoints: [
        "ID. Menyambung pembuktian kita di akhir slide sebelumnya, melihat kode Scikit-learn tadi tentu terasa seperti sebuah sihir yang luar biasa. Namun di dunia rekayasa komputer, sihir sesungguhnya hanyalah rekayasa teknologi yang belum kita bongkar komponen dalamnya. Di balik setiap jaringan saraf tiruan raksasa dan model bahasa tercanggih di dunia, sesungguhnya hanya tersusun dari enam balok fondasi sederhana yang terpampang di hadapan kalian saat ini. Balok pertama adalah Variabel yang berfungsi sebagai wadah memori untuk menampung data dan bobot model. Balok kedua adalah Tipe Data seperti angka desimal fitur bunga yang diproses oleh kecerdasan buatan. Balok ketiga adalah fungsi print untuk memantau metrik akurasi dan hasil keputusan model. Balok keempat adalah percabangan if dan else yang menentukan ambang batas keputusan cerdas. Balok kelima adalah perulangan for loop yang menggerakkan iterasi epoch pelatihan secara berulang. Serta balok keenam adalah Fungsi yang mengemas algoritma rumit menjadi mesin yang dapat kita gunakan kembali seperti perintah fit dan predict. Seluruh bangunan kecerdasan buatan bermula dari balok-balok ini. Dan sekarang, mari kita mulai perjalanan kita dengan membedah balok pertama yaitu Variabel di slide ke-22!",
        "EN. Connecting directly to our live demonstration at the end of the previous slide, watching that Scikit-learn script run certainly felt like pure magic. But in computer engineering, magic is simply technology that we have not yet taken apart piece by piece. Beneath every giant neural network and state-of-the-art language model lie just six foundational LEGO building blocks displayed right before you. Block one is Variables, acting as memory containers to store datasets and neural weights. Block two is Data Types, representing the numbers, text, and measurements processed by AI algorithms. Block three is the print function, our diagnostic window to inspect accuracy scores and predictions. Block four is if and else branching, establishing the logical thresholds for autonomous decisions. Block five is for loops, the training iteration engine repeating mathematical optimizations across epochs. And block six is Functions, the reusable machinery packaging complex algorithms like fit and predict. Every grand AI architecture starts with these humble bricks. Now, let us begin our journey from scratch by dissecting our very first building block, Variables, on slide 22!"
      ],
      pedagogicalTip: "Berikan jeda dramatis untuk menenangkan suasana kelas setelah sesi live demo, lalu klik setiap balok interaktif untuk menunjukkan keterkaitannya langsung dengan kode AI Scikit-learn."
    }
  },

  // SECTION 6 — Python Foundations from Zero (Slides 21 to 26)
  {
    id: 22,
    sectionId: '6',
    sectionName: 'SECTION 6 — Python Foundations from Zero',
    title: 'Variables — Storing Information',
    subtitle: 'Giving names to pieces of memory.',
    thread: 'python',
    layout: 'variables-box',
    codeSnippets: [
      {
        language: 'python',
        label: 'Variable Assignment in Python',
        code: `student_name = "Budi"
student_age = 20
department = "Computer Engineering"`,
        output: `student_name contains "Budi"`
      }
    ],
    visualData: {
      boxMetaphor: {
        label: 'student_name',
        contents: '"Budi"',
        desc: 'Think of a variable as a labeled storage box in the computer\'s memory.'
      }
    },
    speakerNotes: {
      timing: "40.00 hingga 42.00",
      hook: "Menggunakan metafora kotak fisik berlabel di memori komputer untuk menanamkan pemahaman variabel pertama kali.",
      speakingPoints: [
        "ID. Menyambung pembagian enam balok lego pada slide sebelumnya, kini kita resmi memulai langkah perdana kita dengan membedah balok nomor satu yaitu Variabel. Di dunia rekayasa komputer, apakah sesungguhnya yang dimaksud dengan variabel? Cara termudah untuk memahaminya adalah dengan membayangkan sebuah kotak kardus penyimpanan di dunia nyata. Di bagian luar kotak tersebut, kalian menuliskan sebuah label nama menggunakan spidol, misalnya student_name. Kemudian ke dalam kotak tersebut, kalian memasukkan selembar kartu bertuliskan nama Budi. Kapan pun program kita membutuhkan data mahasiswa tersebut, kita tidak perlu mencari-cari ke seluruh penjuru memori, kita cukup memanggil nama label kotak tersebut yaitu student_name, dan Python akan membuka kotak itu lalu menyerahkan nilai Budi kepada kita. Di dalam sintaks Python, penugasan ini dituliskan sangat sederhana yaitu student_name sama dengan tanda petik Budi. Ingat baik-baik bahwa tanda sama dengan tunggal di sini bukan berarti kesamaan matematis kaku, melainkan instruksi penugasan atau assignment, yaitu masukkan nilai di sisi kanan ke dalam wadah berlabel di sisi kiri. Hebatnya Python, kita tidak perlu mendeklarasikan tipe data yang rumit seperti di bahasa lain, sistem akan otomatis mengenali bahwa Budi adalah teks dan angka dua puluh adalah bilangan bulat. Namun mengapa wadah ini disebut variabel yang bermakna bisa bervariasi? Mari kita coba uji dan ganti isinya secara interaktif di slide ke-23!",
        "EN. Connecting directly to our six LEGO building blocks from the previous slide, we now officially take our very first step by examining building block number one, Variables. In computer engineering, what exactly is a variable? The most intuitive way to understand it is to imagine a physical cardboard storage box in the real world. On the outside of the box, you write a clear label with a marker, for instance student_name. Inside that box, you place a card containing the name Budi. Whenever our application needs that student information, we do not need to scour raw computer memory, we simply call the label student_name, and Python opens the container to retrieve the value Budi. In Python syntax, this assignment is written as student_name equals Budi in quotes. Keep firmly in mind that a single equals sign does not mean mathematical equivalence, rather it is an assignment command meaning store the value on the right into the labeled container on the left. Best of all, Python requires no tedious type declarations, it intuitively recognizes that Budi is text and twenty is an integer. But why is this container called a variable, implying that its contents can vary? Let us test and swap its contents interactively on slide 23!"
      ],
      pedagogicalTip: "Tekankan metafora kotak berlabel dan jelaskan bahwa tanda sama dengan tunggal adalah aksi memasukkan nilai sisi kanan ke dalam wadah sisi kiri."
    }
  },
  {
    id: 23,
    sectionId: '6',
    sectionName: 'SECTION 6 — Python Foundations from Zero',
    title: 'Interactive Lunchbox Lab: Variable Assignment',
    subtitle: 'Drag and drop meals into the memory container and watch Python update live.',
    thread: 'python',
    layout: 'variables-lunchbox-drag',
    speakerNotes: {
      timing: "42.00 hingga 44.30",
      hook: "Membuktikan secara langsung konsep penugasan dan penimpaan nilai variabel melalui simulasi interaktif kotak makan bento di memori komputer.",
      speakingPoints: [
        "ID. Menyambung pertanyaan kita di akhir slide sebelumnya, mengapa wadah memori ini disebut variabel yang bermakna bisa bervariasi? Di hadapan kalian sekarang terdapat Laboratorium Interaktif Bento Lunchbox. Anggap kotak bento di sisi kiri ini adalah sebuah alamat memori komputer nyata bernama 0x7F4A dengan label stiker lunch_box. Di bagian atas terdapat lima menu hidangan lezat berilustrasi khusus. Ketika kita menyeret atau mengeklik Beef Burger, Python mengeksekusi instruksi lunch_box sama dengan Beef Burger, calories sama dengan enam ratus dua puluh, dan is_served_hot sama dengan True. Terminal di sisi kanan langsung mencetak bahwa kotak memori ini menyimpan burger. Sekarang perhatikan momen kuncinya. Ketika kita mengambil menu kedua yaitu Salmon Nigiri lalu memasukkannya ke dalam kotak yang sama, apa yang terjadi dengan Beef Burger sebelumnya? Burger tersebut langsung dikeluarkan dan ditimpa secara tuntas! Memori komputer tidak lagi mengingat burger tersebut, karena kini isi kotak telah berganti menjadi Salmon Nigiri dengan kalori tiga ratus delapan puluh. Inilah alasan mendasar mengapa konsep ini dinamakan variabel, yaitu karena nilainya bisa bervariasi dan berubah sewaktu-waktu sepanjang berjalannya program. Namun bagaimana jika kita memiliki beberapa kotak variabel sekaligus dan ingin menggabungkannya dalam kalkulasi, serta bagaimana aturan resmi penamaan label kotak di Python? Mari kita pelajari di slide ke-24!",
        "EN. Connecting directly to our question at the end of the previous slide, why is this memory container specifically called a variable, implying that its contents can vary? Right before you is our Interactive Bento Lunchbox Lab. Think of the bento container on the left as an actual memory address 0x7F4A with a masking tape label named lunch_box. Above it are five delicious custom-illustrated meals. When we drag or click the Beef Burger, Python executes lunch_box equals Beef Burger, calories equals six hundred twenty, and is_served_hot equals True. The live terminal on the right immediately prints that our memory container holds a burger. Now observe the key takeaway. When we pick our second meal, Salmon Nigiri, and drop it into that exact same container, what happens to the previous burger? The burger is completely overwritten and replaced! The computer memory no longer remembers the burger, because the slot now holds Salmon Nigiri with three hundred eighty calories. This demonstrates the core essence of why it is called a variable, because its stored value can vary dynamically over time. But how can we combine multiple variable boxes to perform calculations, and what are the strict rules for naming labels in Python? Let us explore them on slide 24!"
      ],
      pedagogicalTip: "Seret minimal dua atau tiga menu makanan ke dalam lunchbox di layar sambil menunjukkan bagaimana kode Python dan output terminal tertimpa secara otomatis."
    }
  },
  {
    id: 24,
    sectionId: '6',
    sectionName: 'SECTION 6 — Python Foundations from Zero',
    title: 'Combining Variables & Labeling Rules',
    subtitle: 'Doing math with multiple memory boxes and learning valid Python variable names.',
    thread: 'python',
    layout: 'variables-multi-box-lab',
    speakerNotes: {
      timing: "44.30 hingga 47.00",
      hook: "Menggabungkan dua kotak variabel menjadi kalkulasi baru pada Bagian 1 serta menguji stiker aturan penamaan variabel yang sah pada Bagian 2.",
      speakingPoints: [
        "ID. Menyambung keberhasilan kita menguji satu kotak variabel di slide sebelumnya, sekarang bagaimana jika di meja kerja kita terdapat dua kotak sekaligus? Pada Bagian 1 di sebelah kiri, kita memiliki kotak pertama bernama main_cal untuk hidangan utama dan kotak kedua bernama drink_cal untuk minuman. Ketika kita menuliskan total_cal sama dengan main_cal ditambah drink_cal, Python tidak menjumlahkan nama teks labelnya, melainkan membuka kedua kotak tersebut, mengambil angka di dalamnya, lalu menyimpan hasil penjumlahannya ke dalam kotak baru bernama total_cal. Jika kita mengganti burger menjadi ramen atau matcha boba menjadi berry smoothie, kotak total_cal langsung terkalkulasi ulang secara otomatis. Kemudian pada Bagian 2 di sebelah kanan, bagaimana aturan resmi dalam menempelkan stiker label nama kotak variabel di Python? Ini sangat krusial agar kode kita tidak memicu pesan galat SyntaxError. Label seperti lunch_box_1 dan totalCalories sepenuhnya sah karena diawali huruf dan menggunakan garis bawah. Namun stiker 1_lunch_box langsung ditolak karena variabel Python tidak boleh diawali angka. Stiker lunch-box dengan tanda minus juga memicu galat karena Python mengira itu adalah operasi pengurangan matematika. Serta stiker lunch box dengan spasi mutlak dilarang. Sekarang setelah kita memahami operasi variabel dan aturan penamaannya, bagaimana jika kita menguji seluruh pemahaman ini dalam petualangan coding interaktif membangun dunia tiga dimensi? Mari kita buktikan di slide ke-25!",
        "EN. Building directly upon our single-box experiment from the previous slide, what happens when we have multiple variable boxes operating together on our workbench? On Part 1 to your left, we have our first container labeled main_cal and our second container labeled drink_cal. When we write total_cal equals main_cal plus drink_cal, Python does not add the string labels, it looks inside each physical box, retrieves the numerical values, and neatly deposits their sum into a brand-new memory container called total_cal. If we swap the burger for ramen or change matcha boba to berry smoothie, total_cal recalculates automatically in real time. Next, moving to Part 2 on the right, what are Python's strict rules for writing valid variable labels on our memory containers? This is vital to prevent frustrating SyntaxError crashes. Names like lunch_box_1 and totalCalories are fully valid because they begin with letters and use clean underscores. However, 1_lunch_box is rejected immediately because Python variable names cannot begin with a number. Similarly, lunch-box with a hyphen triggers an error because Python interprets the hyphen as subtraction, and spaces are strictly forbidden. Now that we master multi-variable arithmetic and naming rules, how about putting this into practice by building interactive 3D worlds? Let us enter our Story Lab on slide 25!"
      ],
      pedagogicalTip: "Ganti menu makanan pada Bagian 1 untuk menunjukkan kalkulasi dinamis total kalori lalu klik stiker valid dan tidak valid pada Bagian 2 untuk memperlihatkan pesan SyntaxError secara live."
    }
  },
  {
    id: 25,
    sectionId: '6',
    sectionName: 'SECTION 6 - Python Foundations from Zero',
    title: 'Interactive Story Lab for Building 3D Worlds with Variables',
    subtitle: 'Solve two real-world story challenges and watch the 3D visual assemble piece by piece as you write each Python variable.',
    thread: 'python',
    layout: 'variables-story-practice',
    speakerNotes: {
      timing: "47.00 hingga 50.00",
      hook: "Mengajak mahasiswa mengaplikasikan seluruh konsep variabel dan penugasan secara langsung untuk merakit dunia tiga dimensi pada Laboratorium Cerita Interaktif.",
      speakingPoints: [
        "ID. Sebelum kita menutup perkuliahan hari ini dengan rangkuman besar, tibalah saatnya bagi kalian untuk merasakan langsung sensasi menjadi seorang insinyur kecerdasan buatan sejati di Laboratorium Cerita Interaktif. Pada slide ini kita memiliki dua tantangan coding dunia nyata. Tantangan pertama adalah Arsitek Rumah Pintar AI, tempat kalian menuliskan variabel Python untuk merakit rumah masa depan. Coba perhatikan kanvas di sebelah kanan. Kanvas ini terhubung langsung ke mesin penerjemah Python secara real-time. Setiap kali kalian mendeklarasikan sebuah variabel, misalnya roof sama dengan solar, atap panel surya langsung terbangun di atas cetak biru. Jika kalian menuliskan walls sama dengan glass, dinding kaca modern seketika terpasang. Kemudian jika kalian beralih ke Tantangan kedua yaitu Pembangun Robot Penjelajah Otonom, kalian merakit robot penjelajah medan terjal dengan menuliskan variabel head_sensor sama dengan lidar, wheel_units sama dengan enam, serta robotic_arms sama dengan dua. Hebatnya lagi, jika kalian mengganti nilai variabel tersebut, visual tiga dimensi langsung bermutasi seketika untuk membuktikan konsep penimpaan nilai yang kita pelajari di slide ke-23. Dan bila kalian tidak sengaja menuliskan nama variabel dengan awalan angka atau tanda spasi, sistem langsung menampilkan peringatan SyntaxError secara langsung. Seluruh pengalaman interaktif ini membuktikan bahwa variabel bukan sekadar teori teks di buku, melainkan balok pembangun nyata untuk merakit kecerdasan buatan. Dan sekarang, setelah kita menempuh perjalanan luar biasa dari bilangan biner hingga kode tiga dimensi, mari kita simpulkan seluruh pencapaian agung hari ini di slide ke-26!",
        "EN. Before we conclude today's lecture with our grand summary, the moment has arrived for you to experience firsthand what it feels like to engineer intelligent systems inside our Interactive Story Lab. On this slide, we present two real-world coding challenges. Challenge number one is the Smart AI Home Architect, where you write Python variables to construct a futuristic dwelling. Watch the canvas on the right closely. It is directly tethered to a live real-time Python interpreter. Every time you declare a variable, such as roof equals solar, high-tech photovoltaic panels immediately materialize on the blueprint. When you assign walls equals glass, modern panoramic glass walls snap into place instantly. Next, switching to Challenge number two, the Autonomous AI Rover Builder, you assemble a rugged exploration robot by assigning head_sensor equals lidar, wheel_units equals six, and robotic_arms equals two. Best of all, if you reassign any variable value, the 3D rendering mutates instantaneously to prove the variable reassignment concept we explored on slide 23. Furthermore, if you accidentally start a variable name with a digit or insert a space, the live interpreter displays a real-time SyntaxError diagnostic. This proves that variables are far from abstract textbook theory, they are the living building blocks of modern computational intelligence. Now, having traveled from raw binary bits all the way to 3D interactive code, let us tie together our entire journey in our conclusion on slide 26!"
      ],
      pedagogicalTip: "Klik tombol Clear Canvas lalu ketikkan roof sama dengan solar terlebih dahulu untuk memperlihatkan bagaimana visual 3D terbangun secara modular tanpa harus berurutan kaku."
    }
  },
  // SECTION 7 — Closing & Next Week (Slides 25 to 27)
  {
    id: 26,
    sectionId: '7',
    sectionName: 'SECTION 7 — Closing & Recap',
    title: 'Conclusion & Complete Journey Summary',
    subtitle: 'Everything we connected today—from binary machine code to Python variables.',
    thread: 'convergence',
    layout: 'lecture-conclusion-recap',
    bullets: [
      'Chapter 01 (Slides 01–10): From Human Thought & Binary to Python’s Global Rise',
      'Chapter 02 (Slides 11–14): The Story of AI — Pattern Recognition & The 3 Ingredients',
      'Chapter 03 (Slides 15–19): Python + AI Convergence, Scientific Stack & Vectorization',
      'Chapter 04 (Slides 20–24): Python Foundations — Variable Containers, Reassignment, Naming Rules & 3D Story Lab'
    ],
    speakerNotes: {
      timing: "50.00 hingga 54.00",
      hook: "Merajut kembali benang merah perjalanan perkuliahan hari ini melalui empat babak agung mulai dari bilangan biner hingga variabel tiga dimensi.",
      speakingPoints: [
        "ID. Mari kita berhenti sejenak dan merenungkan betapa luar biasanya jarak intelektual yang telah kita tempuh bersama hari ini. Jika kita menoleh ke belakang saat kuliah ini dimulai hampir satu jam yang lalu, kita memulai perjalanan dari kebingungan manusia di hadapan mesin yang hanya memahami angka nol dan satu biner. Kini di hadapan kalian terpampang empat babak kesimpulan agung perkuliahan perdana kita. Babak pertama merangkum evolusi bahasa pemrograman dari instruksi biner hingga lahirnya Python oleh Guido van Rossum pada tahun 1989, yang berhasil menduduki takhta nomor satu dunia berkat kecepatan pengembang dan sintaksisnya yang bersih. Babak kedua mengungkap misteri kecerdasan buatan, di mana kita beralih dari pemrograman konvensional yang melelahkan menuju paradigma pembelajaran mesin berbasis data, algoritma pintar, dan akselerasi kartu grafis. Babak ketiga memperlihatkan titik temu terhebat dalam sejarah komputasi, yaitu bagaimana Python menaklukkan dunia AI melalui ekosistem lima pustaka sains raksasa serta keajaiban vektorisasi SIMD yang seratus enam belas kali lipat lebih cepat. Serta Babak keempat membuka kap mesin pemrograman dari nol, di mana kalian berhasil menguasai balok pertama yaitu Variabel, memahami penugasan nilai dan penimpaan memori melalui bento lunchbox, hingga merakit rumah pintar dan robot penjelajah tiga dimensi secara mandiri. Seluruh kepingan puzzle kini telah terpasang dengan sempurna. Namun perjalanan kita tentu belum berakhir, karena untuk menguji kemandirian kalian sebagai calon insinyur kecerdasan buatan, kita memiliki satu tugas proyek mandiri istimewa di slide ke-27!",
        "EN. Let us pause for a moment and appreciate the extraordinary intellectual distance we have traveled together today. Looking back to when we began nearly an hour ago, we started with human curiosity standing before silent machines that only understood binary zeros and ones. Displayed before you now are the four grand chapters summarizing our inaugural lecture. Chapter one recaps the evolution of programming languages from low-level binary to Guido van Rossum creating Python in 1989, which ascended to global supremacy through developer velocity and readable syntax. Chapter two demystifies artificial intelligence, highlighting the profound paradigm shift from manually writing rigid rules to feeding data into algorithms accelerated by modern GPUs. Chapter three reveals the ultimate technological convergence, showing how Python conquered artificial intelligence through five scientific libraries and lightning-fast SIMD vectorization crunching data 116 times faster. And Chapter four opened the hood of computer programming from scratch, where you mastered our first foundational building block, Variables, understood memory overwriting through our bento lunchbox, and engineered 3D smart homes and exploration rovers. Every piece of today's puzzle now locks seamlessly into place. However, our quest is not complete, because to solidify your independence as future AI engineers, we have an exciting independent capstone project waiting on slide 27!"
      ],
      pedagogicalTip: "Ajak mahasiswa menatap layar dengan bangga, lalu klik masing-masing dari keempat kartu babak perjalanan untuk mengulas poin-poin kunci secara terstruktur sebelum memberikan tugas mandiri di Slide 27."
    }
  },
  {
    id: 27,
    sectionId: '7',
    sectionName: 'SECTION 7 - Closing & Recap',
    title: 'Independent Project Smart Campus AI and PDF Report',
    subtitle: 'Complete the Python variables capstone project hands-on and download your official PDF assignment report.',
    thread: 'convergence',
    layout: 'homework-next-week',
    speakerNotes: {
      timing: "54.00 hingga 57.30",
      hook: "Memperkenalkan proyek penugasan mandiri Manajemen Energi dan Logistik Kampus Pintar AI serta memandu mahasiswa menyusun laporan tugas resmi berformat PDF.",
      speakingPoints: [
        "ID. Sebagai puncak implementasi perkuliahan perdana hari ini, tibalah saatnya bagi kalian untuk membuktikan penguasaan pemrograman Python melalui Proyek Mandiri Manajemen Energi dan Logistik Kampus Pintar AI. Melalui proyek penugasan ini, kalian akan mengintegrasikan seluruh konsep variabel yang telah kita pelajari bersama. Langkah pertama, silakan kalian isi data identitas mahasiswa pada formulir di bagian atas, mulai dari nama lengkap, nomor induk mahasiswa atau NIM, program studi, nama mata kuliah, hingga kelas kalian. Langkah kedua, selesaikan lima tonggak pencapaian variabel terstruktur langsung di dalam editor kode interaktif. Kalian akan mendeklarasikan variabel identitas sistem kampus, menghitung kalkulasi daya energi antar gedung, melakukan penimpaan nilai variabel status logistik robot otonom, memastikan nama variabel mematuhi kaidah snake_case, serta menampilkan laporan diagnostik menggunakan fungsi print. Di sisi kanan, kalian bisa melihat tabel inspeksi memori RAM dan hasil keluaran terminal secara langsung. Setelah seluruh kode kalian berhasil dieksekusi tanpa galat, kalian bisa menekan tombol Pratinjau Laporan untuk memeriksa draf tugas kalian, lalu tekan tombol Unduh Laporan PDF untuk mengunduh dokumen penugasan akademik resmi yang siap kalian kumpulkan ke portal kampus. Proyek ini adalah tiket emas kalian membuktikan diri sebagai calon insinyur kecerdasan buatan yang kompeten. Dan sekarang mari kita menuju slide penutup sesi tanya jawab di slide ke-28!",
        "EN. As the culminating application of our inaugural lecture today, the time has arrived for you to validate your Python mastery through the Smart Campus AI Energy and Logistics Management Capstone Project. Through this assignment, you will synthesize every single variable concept we explored together. Step one, begin by filling in your student metadata in the header form, including your full name, student ID, degree program, course title, and class section. Step two, tackle all five structured milestones directly inside the interactive Python editor. You will declare system identity variables, calculate smart building energy arithmetic, execute variable reassignment for autonomous logistics rovers, strictly apply snake_case naming rules, and generate clean terminal reports using the print function. On the right, you can inspect your active RAM memory state and verify terminal outputs in real time. Once your program runs cleanly without errors, click Preview Report to inspect your submission draft, then hit Download PDF Report to generate an official academic PDF document ready for submission. This assignment serves as your proud credential as an aspiring AI engineer. Now, let us advance to our final Q&A slide on slide 28!"
      ],
      pedagogicalTip: "Pandu mahasiswa mengisi data diri dan demonstrasikan tombol Pratinjau Laporan serta Unduh Laporan PDF agar mahasiswa memahami bagaimana kode dan tabel memori mereka dikompilasi ke dalam dokumen PDF resmi."
    }
  },
  {
    id: 28,
    sectionId: '7',
    sectionName: 'SECTION 7 — Closing & Recap',
    title: 'Thank You — Questions?',
    subtitle: 'See you next week as we continue Variables, Data Types, and beyond!',
    thread: 'convergence',
    layout: 'closing-qa',
    visualData: {
      resources: [
        { title: 'Official Python Documentation', url: 'https://docs.python.org/3/tutorial/' },
        { title: 'Scikit-learn User Guide & Tutorials', url: 'https://scikit-learn.org/stable/' },
        { title: 'AI Engineering Course GitHub Repo', url: 'https://github.com/microsoft/AI-For-Beginners' }
      ],
      contact: {
        department: 'Faculty of Engineering & Applied Computer Science',
        institution: 'Department of Computer Science & Applied AI',
        emailPlaceholder: 'lecturer.ai@university.edu',
        officeHours: 'Weekly Consultation • Bring Your Variables Homework Next Week'
      }
    },
    speakerNotes: {
      timing: "57.30 hingga 60.00",
      hook: "Menutup perkuliahan perdana dengan apresiasi penuh kehangatan serta membuka lantai diskusi tanya jawab interaktif dengan mahasiswa.",
      speakingPoints: [
        "ID. Terima kasih banyak atas antusiasme, fokus, dan energi luar biasa yang kalian curahkan sepanjang perkuliahan perdana hari ini! Kita telah menempuh perjalanan yang sangat padat dan mendalam, mulai dari membongkar instruksi biner tingkat rendah mesin komputer, memahami revolusi cara berpikir kecerdasan buatan, menyaksikan keajaiban pustaka sains Python dan vektorisasi SIMD, hingga berhasil memprogram variabel dan merakit dunia tiga dimensi secara mandiri. Jangan lupa untuk menuntaskan proyek tugas mandiri Kampus Pintar AI pada slide sebelumnya dan mengunduh berkas laporan resmi PDF kalian untuk dikumpulkan sebelum pertemuan kita minggu depan. Di layar ini terdapat tautan materi bacaan lanjutan terpercaya dari dokumentasi resmi Python dan Scikit-learn yang sangat saya rekomendasikan untuk memperkaya wawasan kalian. Dan sekarang, saya membuka lantai ruang kelas kita seluas-luasnya untuk sesi tanya jawab. Silakan jika ada konsep yang ingin kalian tanyakan atau eksplorasi lebih jauh, mari kita diskusikan bersama!",
        "EN. Thank you all immensely for the extraordinary enthusiasm, focus, and intellectual energy you brought to our inaugural lecture today! We have completed a comprehensive and profound journey, traversing from low-level binary machine instructions, understanding the algorithmic revolution of artificial intelligence, witnessing the magic of Python scientific libraries and SIMD vectorization, to successfully coding variables and assembling 3D structures independently. Please be sure to complete your Smart Campus AI capstone project from the previous slide and download your official PDF report ready for submission before our next session. Displayed on the screen are curated further reading links from the official Python and Scikit-learn documentation that I warmly encourage you to explore. And now, I open the floor completely for our interactive question and answer session. Please feel free to ask about any concepts you wish to clarify or explore further, let us discuss them together!"
      ],
      pedagogicalTip: "Biarkan tautan sumber belajar dan informasi kontak dosen terpampang jelas di layar proyektor selama sesi tanya jawab berlangsung, lalu akhiri perkuliahan dengan salam hangat."
    }
  }
];
