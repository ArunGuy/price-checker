import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const steps = [
  { title: 'ยินดีต้อนรับ', content: 'ยินดีต้อนรับสู่ระบบจัดการสินค้า คลิกถัดไปเพื่อเรียนรู้วิธีใช้งาน' },
  { title: 'การค้นหาสินค้า', content: 'ใช้ช่องค้นหาด้านบนเพื่อค้นหาสินค้าที่คุณต้องการ' },
  { title: 'การเพิ่มสินค้า', content: 'คลิกที่ปุ่ม "เพิ่มสินค้า" เพื่อเพิ่มสินค้าใหม่เข้าสู่ระบบ' },
  { title: 'การจัดการ CSV', content: 'ใช้เมนู CSV เพื่อนำเข้าหรือส่งออกข้อมูลสินค้า' },
];

const Onboarding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setIsVisible(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenOnboarding', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <button onClick={handleClose} className="float-right text-gray-500 hover:text-gray-700">
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-2xl font-semibold mb-4">{steps[currentStep].title}</h2>
        <p className="mb-6">{steps[currentStep].content}</p>
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50"
          >
            ย้อนกลับ
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
          >
            {currentStep === steps.length - 1 ? 'เสร็จสิ้น' : 'ถัดไป'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;