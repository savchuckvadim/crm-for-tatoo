'use client';

import { JsonLd } from './json-ld';
import { generateFAQSchema, type FAQItem } from '@/lib/seo/schema';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@workspace/shadcn-components/components/accordion';

interface FAQProps {
    items: FAQItem | FAQItem[];
    showSchema?: boolean;
}

export function FAQ({ items, showSchema = true }: FAQProps) {
    const faqArray = Array.isArray(items) ? items : [items];

    return (
        <>
            {showSchema && <JsonLd data={generateFAQSchema(faqArray)} />}
            <Accordion type="single" collapsible className="w-full">
                {faqArray.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </>
    );
}

