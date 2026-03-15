"use client";

import { FileText } from "lucide-react";

interface DocumentViewerProps {
  fixes: Set<string>;
}

export default function DocumentViewer({ fixes }: DocumentViewerProps) {
  const isFixed = (id: string) => fixes.has(id);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-[10px] border border-gray-200">
      {/* Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <FileText className="h-4 w-4 text-severe-accent" />
          <span className="text-[13px] font-semibold text-gray-800">
            vietnam-street-food-culture.pdf
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button className="flex h-7 items-center gap-1.5 rounded-[5px] border border-gray-200 bg-white px-2.5 text-[11px] font-semibold text-gray-600 transition-all hover:bg-gray-100">
            100%
          </button>
        </div>
      </div>

      {/* Document body */}
      <div className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="mx-auto w-full max-w-[680px] bg-white px-12 py-10 border border-gray-300" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>

          {/* Course label */}
          <div className="mb-1 text-[11px] uppercase tracking-widest text-gray-400">
            Cultural Studies 201 — Research Paper
          </div>

          {/* TITLE: looks like body text by default, becomes proper h1 on fix */}
          {isFixed("fix-h-title") ? (
            <h1 className="mb-6 text-[28px] font-bold leading-tight text-gray-900 transition-all duration-500" style={{ fontFamily: "Georgia, serif" }}>
              Vietnam Street Food Culture: A Journey Through Flavors
            </h1>
          ) : (
            <p className="mb-6 text-[13.5px] leading-7 text-gray-700 transition-all duration-500">
              Vietnam Street Food Culture: A Journey Through Flavors
              <span className="ml-1.5 inline-block rounded bg-severe-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-severe-accent">
                &lt;p&gt;
              </span>
            </p>
          )}

          {/* PARAGRAPH 1: low contrast */}
          <p
            className="mb-5 text-[13.5px] leading-7 transition-colors duration-500"
            style={{ color: isFixed("fix-contrast-1") ? "#374151" : "#b0b0b0" }}
          >
            Vietnam&apos;s street food scene is one of the most vibrant and diverse culinary traditions in the world.
            From the bustling sidewalks of Ho Chi Minh City to the narrow alleys of Hanoi&apos;s Old Quarter,
            food vendors have shaped the daily rhythm of Vietnamese life for centuries.
            This paper explores the cultural significance, regional diversity, and global influence of
            Vietnamese street food.
            {!isFixed("fix-contrast-1") && (
              <span className="ml-1 inline-block rounded bg-minor-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-minor-accent">
                2.3:1
              </span>
            )}
          </p>

          {/* IMAGE 1 */}
          <div className="mb-5 overflow-hidden rounded border border-gray-200">
            <img
              src="/image1.jpg"
              alt={isFixed("fix-img-1") ? "A steaming bowl of phở bò with fresh herbs and lime in Hanoi's Old Quarter" : ""}
              className="h-48 w-full object-cover"
            />
            {isFixed("fix-img-1") ? (
              <div className="bg-minor-bg/50 px-3 py-1.5 text-[11px] text-minor-accent transition-all duration-500">
                alt=&quot;A steaming bowl of phở bò with fresh herbs and lime in Hanoi&apos;s Old Quarter&quot;
              </div>
            ) : (
              <div className="bg-severe-bg/40 px-3 py-1.5 text-[11px] text-severe-accent">
                Missing alt text
              </div>
            )}
          </div>

          {/* SUBTITLE 1: looks like body text by default, becomes h2 on fix */}
          {isFixed("fix-h-sub1") ? (
            <h2 className="mb-3 text-[20px] font-bold text-gray-900 transition-all duration-500" style={{ fontFamily: "Georgia, serif" }}>
              Phở: The Soul of Vietnamese Cuisine
            </h2>
          ) : (
            <p className="mb-3 text-[13.5px] leading-7 text-gray-700 transition-all duration-500">
              Phở: The Soul of Vietnamese Cuisine
              <span className="ml-1.5 inline-block rounded bg-severe-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-severe-accent">
                &lt;p&gt;
              </span>
            </p>
          )}

          {/* Paragraph 2 */}
          <p className="mb-5 text-[13.5px] leading-7 text-gray-700">
            Phở bò originated in northern Vietnam in the early 20th century and quickly spread
            throughout the country. A typical bowl consists of rice noodles in a clear broth, topped with thinly
            sliced beef, fresh herbs, and lime. Each region has its own variation — Hanoi-style phở is
            known for its subtle, delicate broth while Saigon-style is sweeter with more toppings.
          </p>

          {/* LINK 1 */}
          <p className="mb-5 text-[13.5px] leading-7 text-gray-700">
            The history of phở is deeply intertwined with Vietnam&apos;s colonial period and modernization.{" "}
            {isFixed("fix-link-1") ? (
              <a href="#" className="text-blue-600 underline transition-all duration-500">
                Read the full history of phở and its cultural impact
              </a>
            ) : (
              <>
                <a href="#" className="text-blue-500 underline">click here</a>
                <span className="ml-1 inline-block rounded bg-major-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-major-accent">
                  vague
                </span>
              </>
            )}{" "}
            to learn about its evolution from a simple street dish to an international culinary icon.
          </p>

          {/* PARAGRAPH 4: low contrast */}
          <p
            className="mb-5 text-[13.5px] leading-7 transition-colors duration-500"
            style={{ color: isFixed("fix-contrast-2") ? "#374151" : "#c0c0c0" }}
          >
            Bánh mì is another iconic Vietnamese street food that reflects the country&apos;s colonial
            history. The crispy French baguette filled with pâté, pickled vegetables, cilantro,
            and chili represents a perfect fusion of East and West. Today it is recognized as one of the
            world&apos;s greatest sandwiches.
            {!isFixed("fix-contrast-2") && (
              <span className="ml-1 inline-block rounded bg-minor-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-minor-accent">
                2.8:1
              </span>
            )}
          </p>

          {/* IMAGE 2 */}
          <div className="mb-5 ml-auto w-[55%] overflow-hidden rounded border border-gray-200">
            <img
              src="/image2.jpg"
              alt={isFixed("fix-img-2") ? "A freshly made bánh mì sandwich from a Saigon street vendor" : ""}
              className="h-36 w-full object-cover"
            />
            {isFixed("fix-img-2") ? (
              <div className="bg-minor-bg/50 px-3 py-1.5 text-[11px] text-minor-accent transition-all duration-500">
                alt=&quot;A freshly made bánh mì sandwich from a Saigon street vendor&quot;
              </div>
            ) : (
              <div className="bg-severe-bg/40 px-3 py-1.5 text-[11px] text-severe-accent">
                Missing alt text
              </div>
            )}
          </div>

          {/* SUBTITLE 2: looks like body text by default, becomes h2 on fix */}
          {isFixed("fix-h-sub2") ? (
            <h2 className="mb-3 text-[20px] font-bold text-gray-900 transition-all duration-500" style={{ fontFamily: "Georgia, serif" }}>
              Popular Street Food Districts
            </h2>
          ) : (
            <p className="mb-3 text-[13.5px] leading-7 text-gray-700 transition-all duration-500">
              Popular Street Food Districts
              <span className="ml-1.5 inline-block rounded bg-severe-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-severe-accent">
                &lt;p&gt;
              </span>
            </p>
          )}

          {/* Paragraph 5 */}
          <p className="mb-5 text-[13.5px] leading-7 text-gray-700">
            Hanoi&apos;s Old Quarter, particularly the area around Đồng Xuân Market, is considered the heart
            of northern Vietnamese street food. Meanwhile, Bến Thành Market in Ho Chi Minh City offers
            a dizzying array of southern specialties including hủ tiếu, gỏi cuốn, and chè desserts.
          </p>

          {/* LINK 2 */}
          <p className="mb-5 text-[13.5px] leading-7 text-gray-700">
            For a complete guide to the best street food markets in Vietnam,{" "}
            {isFixed("fix-link-2") ? (
              <a href="#" className="text-blue-600 underline transition-all duration-500">
                explore our interactive street food market map
              </a>
            ) : (
              <>
                <a href="#" className="text-blue-500 underline">read more</a>
                <span className="ml-1 inline-block rounded bg-major-bg px-1.5 py-0.5 align-middle text-[9px] font-semibold text-major-accent">
                  vague
                </span>
              </>
            )}.{" "}
            These markets represent centuries of culinary tradition passed down through generations.
          </p>

          {/* IMAGE 3 */}
          <div className="mb-5 w-[42%] overflow-hidden rounded border border-gray-200">
            <img
              src="/image3.jpg"
              alt={isFixed("fix-img-3") ? "Bún chả being grilled over charcoal on a Hanoi sidewalk" : ""}
              className="h-32 w-full object-cover"
            />
            {isFixed("fix-img-3") ? (
              <div className="bg-minor-bg/50 px-3 py-1.5 text-[11px] text-minor-accent transition-all duration-500">
                alt=&quot;Bún chả being grilled over charcoal on a Hanoi sidewalk&quot;
              </div>
            ) : (
              <div className="bg-severe-bg/40 px-3 py-1.5 text-[11px] text-severe-accent">
                Missing alt text
              </div>
            )}
          </div>

          {/* Paragraph 6 */}
          <p className="mb-6 text-[13.5px] leading-7 text-gray-700">
            Bún chả, a Hanoi specialty of grilled pork with rice vermicelli, gained global fame after
            former President Obama enjoyed it during his 2016 visit. The dish is typically served with a
            dipping sauce, fresh herbs, and pickled vegetables.
          </p>

          {/* FORM */}
          <div className="rounded border border-gray-200 bg-gray-50/80 p-5">
            <div className="mb-3 text-[14px] font-bold text-gray-800">Subscribe to Food Culture Newsletter</div>

            {isFixed("fix-form-1") ? (
              <div className="mb-2">
                <label className="mb-1 block text-[12px] font-semibold text-gray-600 transition-all duration-500">Full Name</label>
                <input type="text" placeholder="Enter your name" className="w-[70%] rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-700 outline-none" readOnly />
              </div>
            ) : (
              <div className="mb-2">
                <input type="text" placeholder="Enter your name" className="w-[70%] rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-700 outline-none" readOnly />
                <div className="mt-0.5 text-[9px] text-major-accent">no &lt;label&gt;</div>
              </div>
            )}

            {isFixed("fix-form-2") ? (
              <div className="mb-3">
                <label className="mb-1 block text-[12px] font-semibold text-gray-600 transition-all duration-500">Email Address</label>
                <input type="email" placeholder="Enter your email" className="w-[70%] rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-700 outline-none" readOnly />
              </div>
            ) : (
              <div className="mb-3">
                <input type="email" placeholder="Enter your email" className="w-[70%] rounded border border-gray-300 bg-white px-3 py-2 text-[13px] text-gray-700 outline-none" readOnly />
                <div className="mt-0.5 text-[9px] text-major-accent">no &lt;label&gt;</div>
              </div>
            )}

            <button className="rounded bg-gray-400 px-4 py-2 text-[13px] font-semibold text-white">Subscribe</button>
          </div>

          {/* METADATA */}
          {isFixed("fix-lang") ? (
            <div className="mt-6 rounded border border-dashed border-minor-accent/30 bg-minor-bg/50 px-4 py-3 text-[11px] text-minor-accent transition-all duration-500">
              <code className="rounded bg-minor-accent/10 px-1">&lt;html lang=&quot;en&quot;&gt;</code> — attribute set
            </div>
          ) : (
            <div className="mt-6 rounded border border-dashed border-gray-300 bg-gray-50 px-4 py-3 text-[11px] text-gray-400 transition-all duration-500">
              Missing <code className="rounded bg-gray-200 px-1">&lt;html lang=&quot;...&quot;&gt;</code> attribute
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-xs text-gray-400">Page 1 of 1</div>
      </div>
    </div>
  );
}
