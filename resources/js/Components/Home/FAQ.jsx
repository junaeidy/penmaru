import { Disclosure } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

export default function FAQ({ faqs }) {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 md:mb-12">
          Pertanyaan yang Sering Diajukan (FAQ)
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <Disclosure key={faq.id}>
                {({ open }) => (
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left text-lg md:text-xl font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
                      <span className="flex-1">{faq.pertanyaan}</span>
                      <ChevronDown
                        className={`w-6 h-6 transform transition-transform duration-300 ml-4 flex-shrink-0 text-gray-500 ${
                          open ? "rotate-180 text-blue-500" : ""
                        }`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-6 pb-6 pt-0 text-gray-600 transition-all duration-300 ease-in-out">
                      <hr className="my-2 border-gray-100" />
                      <p className="text-sm md:text-base leading-relaxed">
                        {faq.jawaban}
                      </p>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Belum ada FAQ yang tersedia
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
