import { CONVERSATION_PATTERNS, INDUSTRY_DATA, SALES_SCRIPTS } from './knowledge-base';

export class AIChatEngine {
    constructor(industry = 'manufacturing') {
        this.industry = industry;
        this.conversationHistory = [];
        this.context = {
            stage: 'opening',
            pain_points: [],
            budget_range: null,
            timeline: null,
            decision_maker: false
        };
    }

    // Analyze user question and match with patterns
    analyzeQuestion(question) {
        const lowerQuestion = question.toLowerCase();
        let matchedPattern = null;
        let confidence = 0;

        // Check each pattern
        for (const [pattern, data] of Object.entries(CONVERSATION_PATTERNS)) {
            const keywords = pattern.split('|');
            const matches = keywords.filter(keyword =>
                lowerQuestion.includes(keyword)
            ).length;

            const matchRatio = matches / keywords.length;

            if (matchRatio > confidence) {
                confidence = matchRatio;
                matchedPattern = data;
            }
        }

        return {
            pattern: matchedPattern,
            confidence,
            context: matchedPattern?.context || 'general_inquiry'
        };
    }

    // Generate response based on conversation context
    generateResponse(question) {
        const analysis = this.analyzeQuestion(question);
        const industryData = INDUSTRY_DATA[this.industry] || INDUSTRY_DATA.manufacturing;

        // Update conversation history
        this.conversationHistory.push({
            type: 'user',
            content: question,
            time: new Date().toISOString()
        });

        // Update context based on question
        this.updateContext(question, analysis.context);

        // Generate response based on pattern
        let response = '';

        if (analysis.pattern) {
            // Select random response from pattern
            const template = this.getRandomItem(analysis.pattern.responses);

            // Fill template with industry data
            response = this.fillTemplate(template, industryData);

            // Add sales script based on conversation stage
            response += '\n\n' + this.getSalesScript();

            // Add follow-up question if confidence is high
            if (analysis.confidence > 0.5) {
                const followUp = this.getRandomItem(analysis.pattern.follow_up);
                response += '\n\n' + followUp;
            }
        } else {
            // Generic but helpful response
            response = this.getGenericResponse(question, industryData);
        }

        // Add to history
        this.conversationHistory.push({
            type: 'ai',
            content: response,
            time: new Date().toISOString()
        });

        return {
            response,
            analysis: {
                context: analysis.context,
                confidence: analysis.confidence,
                industry: this.industry,
                stage: this.context.stage
            }
        };
    }

    // Fill template with real data
    fillTemplate(template, data) {
        return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
            return data[key] || match;
        });
    }

    // Get appropriate sales script
    getSalesScript() {
        const scripts = SALES_SCRIPTS[this.context.stage] || SALES_SCRIPTS.middle;
        return this.getRandomItem(scripts);
    }

    // Update conversation context
    updateContext(question, patternContext) {
        // Detect if user is asking about price
        if (patternContext === 'client_asking_price') {
            this.context.stage = 'pricing_talk';
        }

        // Detect if user is decision maker
        if (question.includes('saya putuskan') || question.includes('saya approve')) {
            this.context.decision_maker = true;
        }

        // Detect budget mentions
        const budgetMatch = question.match(/(\d+)\s*(jt|juta|m|miliar)/i);
        if (budgetMatch) {
            this.context.budget_range = budgetMatch[0];
        }

        // Detect timeline mentions
        if (question.includes('cepat') || question.includes('segera') || question.includes('urgent')) {
            this.context.timeline = 'urgent';
        }
    }

    // Get random item from array
    getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Generic but helpful response
    getGenericResponse(question, industryData) {
        const responses = [
            `Untuk pertanyaan tentang "${question}", berdasarkan data ${this.industry}:`,
            `Saya paham Anda ingin tahu tentang "${question}". Dari pengalaman dengan client sejenis:`,
            `Pertanyaan yang bagus. Dalam konteks ${this.industry}, biasanya:`
        ];

        const opening = this.getRandomItem(responses);
        const middle = this.getRandomItem(SALES_SCRIPTS.middle);
        const closing = this.getRandomItem(SALES_SCRIPTS.closing);

        return `${opening}\n\n${middle}\n\n${closing}`;
    }

    // Get conversation summary for email
    getSummary() {
        return {
            industry: this.industry,
            stage: this.context.stage,
            pain_points: this.context.pain_points,
            budget: this.context.budget_range,
            timeline: this.context.timeline,
            decision_maker: this.context.decision_maker,
            conversation_length: this.conversationHistory.length
        };
    }
}