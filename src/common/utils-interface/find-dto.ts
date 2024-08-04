import { DefaultValue } from '../enum/default-value';
import { escapeRegex } from '../regex/regex-func';

export interface IFindDTO {
  search?: string; //In future, change type to Record<string, string>[]
  orderBy?: string; //In future, change type to Record<string, string>[]
  limit?: number;
  offSet?: number;
}

// Check param of DTO
interface IFindDTOAfterCheck {
  search: string; //In future, change type to Record<string, string>[]
  orderBy: string; //In future, change type to Record<string, string>[]
  limit: number;
  offSet: number;
}

export const checkParamFindDTO = (value: IFindDTO): IFindDTOAfterCheck => {
  let { search, orderBy, limit, offSet } = value;
  return {
    search: search ? escapeRegex(search) : DefaultValue.SEARCH,
    orderBy: orderBy ? orderBy : DefaultValue.ORDER_BY_ASC,
    limit: limit ? limit : DefaultValue.LIMIT,
    offSet: offSet ? offSet : DefaultValue.OFF_SET,
  };
};
