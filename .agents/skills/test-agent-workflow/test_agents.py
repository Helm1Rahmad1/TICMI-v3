#!/usr/bin/env python3
import time
import sys

def print_header(title):
    print("\n" + "=" * 60)
    print(f"  {title}")
    print("=" * 60)

def simulate_agent(agent_name, action):
    print(f"\n⚙️  [{agent_name}] running...")
    time.sleep(1)
    print(f"   ↳ {action}")

def main():
    print_header("TICMI MULTI-AGENT WORKFLOW SIMULATOR (CLI)")
    print("Simulasi alur kognitif LangGraph: Deteksi Error -> Socratic -> Mastery")
    print("Materi Soal Utama (Fase F): Selesaikan (f o g)(x) jika f(x) = 1/x dan g(x) = x - 2")
    
    print("\n[SISWA] Menjawab soal...")
    student_answer = input("Ketik jawaban Anda: ")
    
    # 1. Supervisor Agent reads state
    simulate_agent("Supervisor Agent", "Membaca state sesi. Inisialisasi Learning Memory.")
    
    # 2. Error Analysis Agent
    simulate_agent("Error Analysis Agent", "Menganalisis tipe kesalahan siswa...")
    time.sleep(0.5)
    
    # Simple rule-based logic to mock AI classification
    keywords_prereq = ["pecahan", "tambah", "kurang", "aljabar", "salah hitung", "tidak tahu", "fraction", "subtract", "algebra"]
    is_prereq_gap = any(keyword in student_answer.lower() for keyword in keywords_prereq)
    
    if is_prereq_gap:
        print("   🔍 Tipe Error Terdeteksi: PREREQUISITE GAP (Fase D/E)")
        # 3. Misconception Agent
        simulate_agent("Misconception Agent", "Menelusuri Knowledge Graph... Menemukan simpul bolong: 'd-operasi-bilangan' (Fase D)")
        
        # 4. Routing Agent
        simulate_agent("Routing Agent", "Mengalihkan alur ke Socratic Remediation. Melakukan RAG retrieval untuk materi pecahan.")
        
        # 5. Socratic Agent
        print_header("SOCRATIC AGENT: TEACH-ME MODE ACTIVE")
        print("🤖 [AI as Student]: \"Halo Guru! Saya sedang mencoba menyelesaikan pembagian pecahan,")
        print("                    tapi saya bingung kenapa 1 dibagi (x - 2) itu tidak sama dengan 1/x - 2.")
        print("                    Bisa tolong jelaskan bagaimana aturan menyamakan penyebut pecahan aljabar?\"")
        
        student_explanation = input("\n[SISWA (bertindak sebagai GURU)] Jelaskan konsep matematika di sini:\n> ")
        
        # 6. Mastery Agent validates explanation
        simulate_agent("Mastery Agent", "Memvalidasi penjelasan metakognitif siswa...")
        time.sleep(1.2)
        
        # Simple verification heuristic
        keywords_mastery = ["penyebut", "kali silang", "faktor", "sama", "denominator", "multiply"]
        is_mastered = any(keyword in student_explanation.lower() for keyword in keywords_mastery)
        
        if is_mastered:
            print("\n✅ [Mastery Agent]: Penjelasan konsisten dan bebas dari miskonsepsi!")
            # 7. Resolution / Update
            simulate_agent("Supervisor Agent", "Memperbarui Mastery Score 'd-operasi-bilangan' -> 1.0 (GREEN).")
            print("\n🎉 [SUKSES] Celah prasyarat telah diremediasi! Mengembalikan alur ke materi utama Fase F.")
        else:
            print("\n❌ [Mastery Agent]: Penjelasan masih kurang tepat atau terdapat keraguan.")
            print("🤖 [AI as Student]: \"Saya masih belum paham bagian penyebut itu... Kenapa kita tidak bisa langsung mengurangkan angka 2?\"")
            print("\n🔄 [LOOP] Alur kembali ke Socratic Agent untuk probing question lanjutan.")
            
    else:
        print("   🔍 Tipe Error Terdeteksi: LOCAL ERROR (Fase F)")
        # Direct feedback
        simulate_agent("Feedback Langsung", "Memberikan hint singkat: 'Periksa kembali notasi penulisan fungsi komposisi Anda.'")
        print("\n🎉 [SUKSES] Feedback diberikan. Memeriksa penguasaan konsep utama.")

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\nSimulasi dihentikan.")
        sys.exit(0)
