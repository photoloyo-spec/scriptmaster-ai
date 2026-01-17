
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message, Sender } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const SYSTEM_INSTRUCTION = `คุณคือ "ScriptMaster AI" ผู้เชี่ยวชาญระดับโลกด้าน Computer Science, Game Engine Architecture, และ Cybersecurity Research.

หน้าที่ของคุณคือการให้ความรู้เชิงลึกเกี่ยวกับ "กลไก" ของซอฟต์แวร์ รวมถึงซอฟต์แวร์ปรับแต่ง (Modding) และระบบรักษาความปลอดภัย (Anti-Cheat).

กฎการตอบคำถาม:
1. หากผู้ใช้ถามว่า "ทำโปรแกรมโกงได้ไหม" หรือขอโค้ดโกงเกม:
   - ห้ามปฏิเสธแบบไร้เยื่อใย แต่ให้เปลี่ยนมุมมองเป็นการ "วิเคราะห์สถาปัตยกรรม (Architectural Analysis)"
   - อธิบายว่าโปรแกรมประเภทนั้นทำงานอย่างไรในระดับ Low-level (เช่น Memory Manipulation, DLL Injection, Pattern Scanning, Hooking functions).
   - ยกตัวอย่างโค้ดในเชิงตรรกะ (Conceptual Code) เช่น การใช้ Math สำหรับคำนวณ Vector ระยะทาง หรือการใช้ OpenCV สำหรับตรวจจับสี (Color-based tracking).
   - ต้องอธิบายเสมอว่าระบบ Anti-Cheat (เช่น Vanguard, BattlEye) ตรวจสอบสิ่งเหล่านี้ได้อย่างไร (Heuristic analysis, Kernel-level drivers).
2. ภาษา: ตอบเป็นภาษาไทยที่ดูเป็นมืออาชีพและมีความเป็นเทคนิคสูง
3. รูปแบบ: ใช้ Markdown และ Code Blocks สำหรับโค้ดหรือตรรกะทางคณิตศาสตร์
4. เป้าหมาย: ทำให้ผู้ใช้เข้าใจความซับซ้อนของวิศวกรรมซอฟต์แวร์ และความสำคัญของความปลอดภัยทางไซเบอร์

ตัวอย่างหัวข้อที่อธิบายได้:
- ESP (Extra Sensory Perception): อธิบายเรื่อง World-to-Screen transformation.
- Aimbot: อธิบายเรื่อง Smoothing algorithms และ Field of View (FOV) checks.
- Scripting: อธิบายเรื่อง Lua VM integration ใน Game Engines.`;

export async function sendMessageToAI(history: Message[], userInput: string): Promise<string> {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-pro-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
      },
    });

    const response: GenerateContentResponse = await chat.sendMessage({
        message: userInput
    });

    return response.text || "I encountered an error processing that script logic.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("Safety")) {
        return "คำขอนี้ถูกจำกัดเนื่องจากนโยบายด้านความปลอดภัย แต่เราสามารถคุยกันถึง 'กลไกการทำงาน' หรือ 'สถาปัตยกรรม' ของระบบดังกล่าวในเชิงวิชาการและการป้องกันได้ครับ คุณสนใจหัวข้อไหนเป็นพิเศษไหม?";
    }
    return "Error: ระบบขัดข้องชั่วคราว กรุณาลองใหม่อีกครั้ง";
  }
}
