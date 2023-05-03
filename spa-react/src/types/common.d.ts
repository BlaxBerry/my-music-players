/**
 * 获取指定 object 数据的所有 key 键的类型
 */
declare type KeyOfData<T> = keyof T

/**
 * 获取指定 object 数据的所有 value 值的类型
 */
declare type ValueOfData<T> = T[keyof T]
