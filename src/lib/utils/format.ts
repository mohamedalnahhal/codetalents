interface FormatOption {
  res?: number | undefined,
  decimalPoints?: number | undefined,
  extraDecimalPoints?: number | undefined,
  roundMethod?: 'trunc' | 'round'
}

type DataUnit = 'Bytes' | 'KB' | 'MB' | 'GB' | 'TB';

const DataUnits = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

export type Formated = { number?: number, unit: string, extra?: { number?: number, unit: string }[] };

export interface FormatDataOption extends FormatOption {
  minUnit?: DataUnit | undefined,
  maxUnit?: DataUnit | undefined,
  fixedUnit?: DataUnit | undefined
}

const defaultFormatDataOptions : FormatDataOption = { res: 0, minUnit: 'Bytes', maxUnit: 'TB', decimalPoints: 2, roundMethod: 'round' };
export function formatData(bytes: string | number, options: FormatDataOption = defaultFormatDataOptions): Formated {
  const minUnit = DataUnits.indexOf((options.minUnit === undefined? defaultFormatDataOptions.minUnit : options.minUnit)!);
  const maxUnit = DataUnits.indexOf((options.maxUnit === undefined? defaultFormatDataOptions.maxUnit : options.maxUnit)!);
  const res = Math.max(0, Math.min(4, (options.res === undefined ? defaultFormatDataOptions.res : options.res)!));
  const decimalPoints = Math.pow(10, (options.decimalPoints === undefined ? defaultFormatDataOptions.decimalPoints : options.decimalPoints)!);
  const extraDecimalPoints = options.extraDecimalPoints ? Math.pow(10, options.extraDecimalPoints) : 1;
  const roundMethod = options.roundMethod ? options.roundMethod : defaultFormatDataOptions.roundMethod!;
  const rn = (typeof bytes === "string") ? parseInt(bytes as string) : bytes as number;
  let n = Math.abs(rn);
  let unit;
  let remainders: { number: number, unit: string }[] | undefined = undefined;
  if (options.fixedUnit) {
    let unitIndex = DataUnits.indexOf(options.fixedUnit);
    if (unitIndex > -1) {
      n = n / Math.pow(1024, (unitIndex + 1));
      unit = options.fixedUnit;
    } else {
      throw new Error("Unvalid Fixed Unit");
    }
  }
  else {
    remainders = [];
    n = n / Math.pow(1024, minUnit);
    let i = minUnit;
    while (i < maxUnit && n / 1024 >= 1) {
      let extraN = n % 1024;
      if (extraN) {
        remainders.push({ number: (Math[roundMethod]((extraN) + Number.EPSILON) * extraDecimalPoints) / extraDecimalPoints, unit: DataUnits[i]});
      }
      if (remainders.length > res) {
        remainders.shift();
        for (let j = 0; j < remainders.length; j++) {
          if (!remainders[j].number) remainders.shift();
        }
        n = n / 1024;
      }
      else n = Math.floor(n / 1024);
      i++;
    }
    unit = DataUnits[i];
    remainders.reverse();
  }
  
  return {number:(Math[roundMethod]((n * (rn < 0? -1 : 1) + Number.EPSILON) * decimalPoints) / decimalPoints), unit, extra: remainders};
}

const TimeUnits = [
  [
    'ثانية',
    'ثانيتين',
    'ثواني',
  ],
  [
    'دقيقة',
    'دقيقتان',
    'دقائق',
  ],
  [
    'ساعة',
    'ساعتين',
    'ساعات'
  ],
  [
    'يوم',
    'يومين',
    'ايام',
  ],
  [
    'اسبوع',
    'اسبوعين',
    'اسابيع',
  ],
  [
    'شهر',
    'شهرين',
    'اشهر',
  ],
  [
    'سنة',
    'سنتين',
    'سنوات',
  ]
];
const time1stUnit = TimeUnits.map((value) => value[0]);
const TimeDivider = [1, 60, 60, 24, 7, 30];

type TimeUnit = 'ثانية' | 'دقيقة' | 'ساعة' | 'يوم' | 'اسبوع' | 'شهر' | 'سنة';
export interface FormatTimeOption extends FormatOption {
  minUnit?: TimeUnit | undefined,
  maxUnit?: TimeUnit | undefined,
  fixedUnit?: TimeUnit | undefined,
  wordAffirm?: boolean
}
const defaultFormatTimeOptions : FormatTimeOption = { res: 1, minUnit: 'ثانية', maxUnit: 'سنة', decimalPoints: 2, roundMethod: 'round', wordAffirm: true };
export function formatTime(secs: string | number, options?: FormatTimeOption): Formated {
  const minUnit = time1stUnit.indexOf((options?.minUnit === undefined? defaultFormatTimeOptions.minUnit : options.minUnit)!);
  const maxUnit = time1stUnit.indexOf((options?.maxUnit === undefined? defaultFormatTimeOptions.maxUnit : options.maxUnit)!);
  const res = Math.max(0, Math.min(6, (options?.res === undefined ? defaultFormatTimeOptions.res : options.res)!));
  const decimalPoints = Math.pow(10, (options?.decimalPoints === undefined ? defaultFormatTimeOptions.decimalPoints : options.decimalPoints)!);
  const extraDecimalPoints = options?.extraDecimalPoints ? Math.pow(10, options.extraDecimalPoints) : 1;
  const roundMethod = options?.roundMethod ? options.roundMethod : defaultFormatTimeOptions.roundMethod!;
  const wordAffirm = options?.wordAffirm !== undefined ? options.wordAffirm : defaultFormatTimeOptions.wordAffirm!;
  const rn = (typeof secs === "string") ? parseInt(secs as string) : secs as number;
  let n = Math.abs(rn);
  if (options?.fixedUnit) {
    let unitIndex = time1stUnit.indexOf(options.fixedUnit);
    if (unitIndex > -1) {
      n = n / TimeDivider.slice(0, unitIndex+1).reduce((prev, curr) => prev * curr, 1);
      const unit = TimeUnits[unitIndex][(n === 2 || n === 1)? n-1 : (n > 10 || n < 3)? 0 : 2] + (n === 1 && wordAffirm ? ' واحد' + ((unitIndex < 3 || unitIndex > 5)? 'ة' : '') : '');
      return (n === 1 || n === 2)? {unit} : {number:(Math.round((n * (rn < 0? -1 : 1) + Number.EPSILON) * decimalPoints) / decimalPoints), unit};
    } else {
      throw new Error("Unvalid Fixed Unit");
    }
  }
  n = n / TimeDivider.slice(0, minUnit + 1).reduce((prev, curr) => prev * curr, 1);
  let remainders: { number: number, unit: string }[] = [];
  let i = minUnit;
  while (i < maxUnit && n / TimeDivider[i + 1] >= 1) {
    let extraN = n % TimeDivider[i + 1];
    if (extraN) {
      remainders.push({ number: (Math[roundMethod]((extraN) + Number.EPSILON) * extraDecimalPoints) / extraDecimalPoints, unit: TimeUnits[i][((extraN === 0)? 2 : (extraN < 3) ? Math[roundMethod](extraN - 1) : (extraN > 10) ? 0 : 2)] });
    }
    if (remainders.length > res) {
      remainders.shift();
      for (let j = 0; j < remainders.length; j++) {
        if (!remainders[j].number) remainders.shift();
      }
      n = n / TimeDivider[i + 1];
    }
    else n = Math.floor(n/TimeDivider[i+1]);
    i++;
  }
  remainders.reverse();
  i = i === -1 ? 0 : i;
  const unit = TimeUnits[i][(n === 2 || n === 1)? n-1 : (n > 10 || n < 3)? 0 : 2] + (n === 1 && wordAffirm ? (' واحد' + ((i < 3 || i > 5)? 'ة' : '')) : '');
  return (n === 2 || n === 1) ? { unit, extra: remainders} : {number:(Math[roundMethod]((n * (rn < 0? -1 : 1) + Number.EPSILON) * decimalPoints) / decimalPoints), unit, extra: remainders};
}

interface FormatTimeClockOptions {
  /** @default 12 */
  format: 24 | 12,
  /** @default false */
  show_period: boolean,
  /** @default false */
  include_secs?: boolean,
  /** @default true */
  include_minuts?: boolean,
  /** @default true */
  include_hours?: boolean,
}
export function formatTimeClock(secs: number, options?: FormatTimeClockOptions): string {
  const fmt = options?.format ?? 12;
  const prd = options?.show_period ?? false;
  const ih = options?.include_hours ?? true;
  const im = options?.include_minuts ?? true;
  const is = options?.include_secs ?? false;
  
  let h: string|number = (ih)? Math.floor(secs / 3600) : 0;
  let m: string|number = (im)? Math.floor((secs - (h * 3600)) / 60) : 0;
  let s: string|number = (is)? secs - (h * 3600) - (m * 60) : 0;

  let fh: string|number = h%24;
  if (fmt === 12 && fh > 12) fh -= 12;
  if (fh < 10) { fh = "0" + fh; }
  if (m < 10) { m = "0" + m; }
  if (s < 10) { s = "0" + s; }
  
  return `${ih? fh : ''}${im? (ih?':':'') + m : ''}${is? (im?':':(ih?'::':'')) + s : ''}${fmt === 12 && prd? h>=12?'pm':'am' : ''}`;
}

export interface FormatUnitOptions {
  alwaysShowUnit?: boolean,
  wordAffirm?: 'male' | 'female' | false
}
const defaultFormatUnitOptions : FormatUnitOptions = { alwaysShowUnit: false, wordAffirm: false };
export function formatUnit(n: number, units: string[], options:FormatUnitOptions=defaultFormatUnitOptions) {
  const alwaysShowUnit = options?.alwaysShowUnit !== undefined ? options.alwaysShowUnit : defaultFormatUnitOptions.alwaysShowUnit!;
  const wordAffirm = options?.wordAffirm !== undefined ? options.wordAffirm : defaultFormatUnitOptions.wordAffirm!;
  const unit = units[((n === 2 || n === 1) ? n - 1 : (n > 10 || n < 3) ? 0 : 2)]  + (n === 1 && wordAffirm ? (' واحد' + ((wordAffirm === 'female')? 'ة' : '')) : '');
  return (n === 2 || n === 1 && !alwaysShowUnit) ? unit : n + " " + unit;
}

export function joinFormated(formated: Formated, options?: { hideUnit?: boolean, dir?: "ltr"|"rtl"}): string {
  let str = '';
  const hideUnit = options && options.hideUnit ? options.hideUnit : false;
  // if (formated.number) str = str.concat(formated.number.toString());
  str = str.concat(`${formated.number !== undefined? formated.number : ''} ${(hideUnit)? '' : formated.unit}`);
  if (formated.extra) {
    for (const extra of formated.extra) {
      str = str.concat(` و ${extra.number !== undefined? extra.number : ''} ${(hideUnit)? '' : extra.unit}`);
    }
  }
  return str;
}