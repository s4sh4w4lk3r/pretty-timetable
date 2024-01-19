namespace Services.Interfaces.Substs
{
    public interface ISubstService
    {
        Task<ServiceResult<int>> PutAsync(Repository.Entities.Substs.Substitution substitution, CancellationToken cancellationToken = default);
        Task<ServiceResult<int>> DeleteAsync(int id, CancellationToken cancellationToken = default);
        Task<ServiceResult> NotifySubscribersAsync(int substId, CancellationToken cancellationToken = default);

        async Task<ServiceResult> PutAndNotifyAsync(Repository.Entities.Substs.Substitution substitution, CancellationToken cancellationToken = default)
        {
            var putResult = await PutAsync(substitution, cancellationToken);
            if (putResult.Success is false)
            {
                return ServiceResult.Fail("Замена не добавилась или не обновилась.").AddInnerResult(putResult);
            }

            var notifyResult = await NotifySubscribersAsync(putResult.Value, cancellationToken);
            notifyResult.AddInnerResult(putResult);

            if (notifyResult.Success is false)
            {
                return ServiceResult.Fail("Подписчики не были оповещены о замене.").AddInnerResult(notifyResult);
            }

            return ServiceResult.Ok("Замена добавлена и подписчики были оповещены о ней.");
        }

    }
}
