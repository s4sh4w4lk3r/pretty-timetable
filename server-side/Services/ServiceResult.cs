#pragma warning disable CS1591 // Missing XML comment for publicly visible type or member
namespace Services;

/// <summary>
/// Класс, который содержит в себе информацию о том, как отработал метод сервиса.
/// </summary>
public class ServiceResult(bool success, string description)
{
    public bool Success { get; init; } = success;
    public string Description { get; init; } = description;
    public ServiceResult? InnerServiceResult { get; private protected set; }


    public ServiceResult(bool success, string description, ServiceResult innerServiceResult) : this(success, description)
    {
        InnerServiceResult = innerServiceResult;
    }


    public static ServiceResult Fail(string description) => new(false, description);
    public static ServiceResult Ok(string description) => new(true, description);


    public static ServiceResult<T> Fail<T>(string description, T? value) => new(false, description, value);
    public static ServiceResult<T> Ok<T>(string description, T? value) => new(true, description, value);



    public ServiceResult AddInnerResult(ServiceResult innerServiceResult)
    {
        InnerServiceResult = innerServiceResult;
        return this;
    }



    public override string ToString()
    {
        return $"Success: {Success}, Description: {Description}, InnverServiceResult: {InnerServiceResult}";
    }
}

/// <summary>
/// <inheritdoc/>
/// </summary>
/// <typeparam name="T">Тип объекта для свойства Value.</typeparam>
public class ServiceResult<T> : ServiceResult
{
    public T? Value { get; init; }

    public ServiceResult(bool success, string description, T? value) : base(success, description)
    {
        Value = value;
    }

    public ServiceResult(bool success, string description, ServiceResult innerServiceResult, T? value) : base(success, description, innerServiceResult)
    {
        Value = value;
    }

    public new ServiceResult<T> AddInnerResult(ServiceResult innerServiceResult)
    {
        InnerServiceResult = innerServiceResult;
        return this;
    }

    public override string ToString()
    {
        return $"{base.ToString()}, Value: {Value}";
    }
}





#pragma warning restore CS1591 // Missing XML comment for publicly visible type or member