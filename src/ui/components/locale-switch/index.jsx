import {SegmentedRadioGroup} from "@gravity-ui/uikit";
import {useResourceLocale} from "@/providers/resource-locale.jsx";

const LOCALES = ['uz', 'ru', 'en']

export default function LocaleSwitch({value, onUpdate} = {}) {
    const {resourceLocale, changeResourceLocale} = useResourceLocale()

    return (
        <SegmentedRadioGroup value={value ?? resourceLocale} onUpdate={onUpdate ?? changeResourceLocale} size="m">
            {LOCALES.map((l) => (
                <SegmentedRadioGroup.Option key={l} value={l}>
                    {l.toUpperCase()}
                </SegmentedRadioGroup.Option>
            ))}
        </SegmentedRadioGroup>
    )
}
