'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useImageContext } from '@/lib/image-context';
import { useRouter } from 'next/navigation';

export default function MaterialsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('壁');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState<number | null>(null);
  const [showMaterialInfo, setShowMaterialInfo] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const materialsContainerRef = useRef<HTMLDivElement>(null);
  const { categoryImage, setMaterialImage } = useImageContext();
  const router = useRouter();

  useEffect(() => {
    // 画面遷移時に最上部にスクロールする
    window.scrollTo(0, 0);

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    // 画像がない場合はカテゴリーページにリダイレクト
    if (!categoryImage) {
      router.push('/2-category');
    }
  }, [categoryParam, categoryImage, router]);

  useEffect(() => {
    // Check if the device is mobile or tablet
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // カテゴリー別の素材データ（実際の実装ではAPIから取得など）
  const materials = {
    壁: [
      { id: 1, name: 'ホワイトペイント', color: '白色' },
      { id: 2, name: 'ベージュクロス', color: 'ベージュ' },
      { id: 3, name: 'グレーペイント', color: 'グレー' },
      { id: 4, name: 'ブルーペイント', color: '青色' },
      { id: 5, name: 'グリーンペイント', color: '緑色' },
      { id: 6, name: 'イエローペイント', color: '黄色' },
      { id: 7, name: 'ピンククロス', color: 'ピンク' },
      { id: 8, name: '木目調クロス', color: '茶色' },
      { id: 9, name: 'モルタル調', color: 'グレー' },
    ],
    床: [
      {
        id: 1,
        name: 'オーク柄フローリング',
        color: 'ベージュ',
        image: '/images/FL-MD-BE-016.jpg',
      },
      {
        id: 2,
        name: '大理石調ブラックフローリング',
        color: '黒色',
        image: '/images/FL-MD-BKM-013.jpg',
      },
      {
        id: 3,
        name: 'グレーアッシュ柄フローリング',
        color: 'グレー',
        image: '/images/FL-CR-WH-011.jpg',
      },
      { id: 4, name: 'バーチ', color: '明るい茶色' },
      { id: 5, name: 'メープル', color: '黄茶色' },
      { id: 6, name: '竹フローリング', color: '薄黄色' },
      { id: 7, name: 'コルク', color: '茶色' },
      { id: 8, name: 'タイル', color: 'グレー' },
      { id: 9, name: 'カーペット', color: 'ベージュ' },
    ],
    ドア: [
      { id: 1, name: 'ホワイトドア', color: '白色' },
      { id: 2, name: 'ナチュラルウッド', color: '薄茶色' },
      { id: 3, name: 'ダークウッド', color: '濃茶色' },
      { id: 4, name: 'ガラスドア', color: '透明' },
      { id: 5, name: 'フロストガラス', color: '半透明' },
      { id: 6, name: '黒塗装ドア', color: '黒色' },
      { id: 7, name: 'グレードア', color: 'グレー' },
      { id: 8, name: 'ブルードア', color: '青色' },
      { id: 9, name: 'グリーンドア', color: '緑色' },
    ],
  };

  // 安全にアクセスするためのヘルパー関数
  const getMaterialsForCategory = () => {
    return materials[selectedCategory as keyof typeof materials] || [];
  };

  const currentMaterials = getMaterialsForCategory().slice(currentPage * 3, currentPage * 3 + 3);

  const totalPages = Math.ceil(getMaterialsForCategory().length / 3);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(0);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(totalPages - 1);
    }
  };

  const handleMaterialClick = (id: number) => {
    setSelectedMaterial(id);
    setShowMaterialInfo(true);

    // 選択した素材情報を保存
    if (categoryImage) {
      // 実際のアプリでは、ここで選択した素材を画像に適用する処理を行う
      // 仮想的な処理として、選択された素材情報を保存
      setMaterialImage(categoryImage); // 実際には素材適用後の画像を設定
    }

    // 3秒後に情報を非表示にする
    setTimeout(() => {
      setShowMaterialInfo(false);
    }, 3000);
  };

  // スワイプ機能のためのイベントハンドラ
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMobile) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchEndX - touchStartX;

    // スワイプの距離が50px以上の場合のみ処理
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      // 右にスワイプ - 前のページ
      prevPage();
    } else {
      // 左にスワイプ - 次のページ
      nextPage();
    }

    // タッチ位置をリセット
    setTouchStartX(touchEndX);
  };

  const handleNextClick = (e: React.MouseEvent) => {
    if (selectedMaterial === null) {
      e.preventDefault();
      document.getElementById('error-message')?.classList.add('show');
      setTimeout(() => {
        document.getElementById('error-message')?.classList.remove('show');
      }, 3000);
    }
  };

  // 素材の色に対応するスタイルを取得
  const getMaterialColorStyle = (color: string) => {
    const colorMap: Record<string, string> = {
      '白色': '#f8f9fa',
      'ベージュ': '#f5f5dc',
      'グレー': '#808080',
      '青色': '#1e90ff',
      '緑色': '#2e8b57',
      '黄色': '#ffeb3b',
      'ピンク': '#ffb6c1',
      '茶色': '#8b4513',
      '黒色': '#333333',
      '透明': '#ffffff',
      '半透明': '#f0f0f0',
      '明るい茶色': '#d2b48c',
      '黄茶色': '#cd853f',
      '薄黄色': '#f0e68c',
      '濃茶色': '#654321',
    };
    
    return colorMap[color] || '#cccccc';
  };

  // テキスト色を判定（背景色に基づく）
  const getTextColor = (color: string) => {
    const lightColors = ['白色', 'ベージュ', '半透明', '透明', '薄黄色', '黄色'];
    return lightColors.includes(color) ? 'text-gray-700' : 'text-white';
  };

  return (
    <div className="min-h-screen bg-[#fdf6f2]">
      <header className="p-4 flex justify-between items-center bg-white shadow-sm">
        <Link href="/" className="flex items-center">
          <Image 
            src="/images/logo.png" 
            alt="リフォトル" 
            width={40} 
            height={40} 
            className="mr-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="text-xl font-bold">リフォトル</span>
        </Link>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-8 md:col-start-3">
            {/* ステップナビゲーション */}
            <div className="step-nav">
              <div className="step-item">
                <div className="step-circle step-completed">1</div>
                <div className="step-label">
                  部屋写真
                  <br />
                  アップ
                </div>
              </div>
              <div className="step-line line-active"></div>
              <div className="step-item">
                <div className="step-circle step-completed">2</div>
                <div className="step-label">
                  カテゴリ
                  <br />
                  範囲選択
                </div>
              </div>
              <div className="step-line line-active"></div>
              <div className="step-item">
                <div className="step-circle step-active">3</div>
                <div className="step-label">素材選択</div>
              </div>
              <div className="step-line line-inactive"></div>
              <div className="step-item">
                <div className="step-circle step-inactive">4</div>
                <div className="step-label">作成完了</div>
              </div>
            </div>

            <div className="text-center mb-8 mt-6">
              <h1 className="text-2xl md:text-3xl font-bold">素材を選択</h1>
            </div>

            <div className="bg-white rounded-lg p-4 mb-8 relative">
              <div className="text-base md:text-lg mb-3">選択中: {selectedCategory}</div>
              <div className="relative mb-6 image-container">
                {categoryImage ? (
                  <Image
                    src={categoryImage}
                    alt="Room Image"
                    width={640}
                    height={480}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
                    <span className="text-gray-500">カテゴリー選択した写真</span>
                  </div>
                )}

                {selectedMaterial && showMaterialInfo && (
                  <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-4 py-2 rounded-md text-base">
                    {getMaterialsForCategory().find((m) => m.id === selectedMaterial)?.name}
                    ({getMaterialsForCategory().find((m) => m.id === selectedMaterial)?.color})
                  </div>
                )}
              </div>

              <div className="relative">
                <div
                  ref={materialsContainerRef}
                  className="material-grid mb-3"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                >
                  {currentMaterials.map((material) => (
                    <div
                      key={material.id}
                      className={`material-item ${selectedMaterial === material.id ? 'selected' : ''}`}
                      onClick={() => handleMaterialClick(material.id)}
                    >
                      {'image' in material && material.image ? (
                        <div className="h-32">
                          <Image
                            src={typeof material.image === 'string' ? material.image : '/images/placeholder.jpg'}
                            alt={material.name}
                            width={150}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div 
                          className="h-32 flex items-center justify-center"
                          style={{ 
                            backgroundColor: getMaterialColorStyle(material.color)
                          }}
                        >
                          <span className={getTextColor(material.color)}>
                            {material.name}
                          </span>
                        </div>
                      )}
                      <div className="material-info">
                        {material.name}
                        <br />({material.color})
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    className="w-10 h-10 bg-[#eb6832] rounded-full flex items-center justify-center"
                    onClick={prevPage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>

                  <div className="text-base text-center">
                    {currentPage + 1} / {totalPages || 1}
                  </div>

                  <button
                    className="w-10 h-10 bg-[#eb6832] rounded-full flex items-center justify-center"
                    onClick={nextPage}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-auto">
              <Link href="/2-category" className="border border-gray-300 rounded-md px-5 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>戻る</span>
              </Link>
              <Link
                href="/4-preview"
                onClick={handleNextClick}
                className={selectedMaterial === null ? 'pointer-events-none' : ''}
              >
                <div className={`bg-[#eb6832] text-white px-5 py-2 rounded-md hover:bg-[#d55a25] transition-colors flex items-center ${selectedMaterial === null ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  <span>次へ進む</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </Link>
            </div>

            {selectedMaterial === null && (
              <div className="error-message mt-2" id="error-message">
                素材を選択してから次へ進んでください
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}